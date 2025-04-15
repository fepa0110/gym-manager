"use client";

import {
	getClientes,
	getClientesPage,
	getTotalClientes,
} from "@/service/supabase/client/Clientes";
import { Cliente } from "@/types/Cliente";
import { createClient } from "@/utils/supabase/client";
import { Temporal } from "temporal-polyfill";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Tooltip } from "@/components/ui/tooltip";

export default function Page() {
	const supabase = createClient();
	const router = useRouter();

	const user = supabase.auth.getUser();

	if (!user) {
		return router.replace("/login");
	}

	const pageSize = 8;
	const [totalPages, setTotalPages] = useState<number>(1);
	const [clientes, setClientes] = useState<Cliente[] | null>([]);
	const [page, setPage] = useState<number>(1);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getPaginationData();
		getClientesData();
	}, [page]);

	const getPaginationData = async () => {
		setIsLoading(true);

		const totalClientes = await getTotalClientes();

		if (totalClientes != null) {
			setTotalPages(Math.ceil(totalClientes / pageSize));
		}

		setIsLoading(false);
	};

	const getClientesData = async () => {
		setIsLoading(true);

		const fromPageRange = (page - 1) * pageSize;
		const toPageRange = fromPageRange + pageSize - 1;

		console.log(`from ${fromPageRange} to ${toPageRange}`);

		const data = await getClientesPage(fromPageRange, toPageRange);
		setClientes(data);

		setIsLoading(false);
	};

	const ClienteAcciones = ({ clienteId }: { clienteId: string }) => {
		return (
			<span className="inline-flex divide-x divide-zinc-700 overflow-hidden rounded border-0 border-zinc-700 bg-background shadow-sm">
				<Link
					href={`/clientes/${clienteId}`}
					className="has-tooltip px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 transition-colors hover:text-primary hover:dark:text-primary focus:relative">
					<Tooltip text="Planilla" />
					<FontAwesomeIcon icon={faEye} size="sm" />
				</Link>

				<Link
					href={`/clientes/${clienteId}/rutinas`}
					className="has-tooltip px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 transition-colors hover:text-primary hover:dark:text-primary focus:relative">
					<Tooltip text="Rutinas" />
					<FontAwesomeIcon icon={faDumbbell} size="sm" />
				</Link>
			</span>
		);
	};

	const ClientesList = () => {
		return (
			<table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-400 bg-background text-sm">
				<thead className="ltr:text-left rtl:text-right">
					<tr>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Nombre
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Apellido
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							DNI
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Observaciones
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Acciones
						</th>
					</tr>
				</thead>

				{isLoading ? (
					<TableSkeleton numRows={pageSize - 1} numColumns={5} />
				) : (
					<tbody className="divide-y divide-gray-200">
						{clientes?.map((cliente: Cliente) => {
							return (
								<tr
									key={`clientrow${cliente.id}`}
									className="text-center">
									<td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-slate-100">
										{cliente.nombre}
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
										{cliente.apellido}
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
										{cliente.dni}
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
										{cliente.observaciones}
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
										<ClienteAcciones clienteId={cliente.id} />
									</td>
								</tr>
							);
						})}
					</tbody>
				)}
			</table>
		);
	};

	return (
		<>
			<div className="flex flex-row w-full justify-between items-center">
				<h1 className="text-2xl text-primary">Clientes</h1>
				<Link href="/clientes/new">
					<Button variant="default" size="sm">
						Nuevo
					</Button>
				</Link>
			</div>
			<div className="rounded-lg borderborder-gray-200 dark:border-gray-400">
				<ClientesList />
			</div>
			<Pagination
				currentPage={page}
				totalPages={totalPages}
				showMaxPages={totalPages}
				changePage={setPage}
			/>
		</>
	);
}

/* 'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [clientes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('clientes').select("*")
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(clientes, null, 2)}</pre>
} */
