import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import { faSadTear } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

import { getClienteById } from "@/service/supabase/Clientes";
import { Cliente } from "@/types/Cliente";
import { getRutinasByCliente } from "@/service/supabase/Rutinas";
import { VolverButton } from "./actions";
import { RowsSkeleton } from "@/components/ui/rows-skeleton";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { NotFound } from "@/components/not-found";
import { Table } from "@/components/Table";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	const cliente: any[] | null = await getClienteById(Number(id));
	const rutinasCliente: any[] | null = await getRutinasByCliente(id);

	const ClientePersonalData = () => {
		return (
			<div className="flow-root my-6">
				<dl className="-my-3 divide-y divide-zinc-800 text-sm md:w-3/4">
					<div className="grid grid-cols-1 py-3 sm:grid-cols-3 sm:gap-4">
						<dt className="font-medium text-zinc-900 dark:text-zinc-400">
							Nombre
						</dt>

						<dd className="text-zinc-700 dark:text-zinc-200 sm:col-span-2">
							{cliente!![0].nombre}
						</dd>
					</div>

					<div className="grid grid-cols-1 py-3 sm:grid-cols-3 sm:gap-4">
						<dt className="font-medium text-zinc-900 dark:text-zinc-400">
							Apellido
						</dt>

						<dd className="text-zinc-700 dark:text-zinc-200 sm:col-span-2">
							{cliente!![0].apellido}
						</dd>
					</div>

					<div className="grid grid-cols-1 py-3 sm:grid-cols-3 sm:gap-4">
						<dt className="font-medium text-zinc-900 dark:text-zinc-400">
							DNI
						</dt>

						<dd className="text-zinc-700 dark:text-zinc-200 sm:col-span-2">
							{cliente!![0].dni}
						</dd>
					</div>

					<div className="grid grid-cols-1 py-3 sm:grid-cols-3 sm:gap-4">
						<dt className="font-medium text-zinc-900 dark:text-zinc-400">
							Observaciones
						</dt>

						<dd className="text-zinc-700 dark:text-zinc-200 sm:col-span-2">
							{cliente!![0].observaciones || "-"}
						</dd>
					</div>

					<div className="grid grid-cols-1 py-3 sm:grid-cols-3 sm:gap-4">
						<dt className="font-medium text-zinc-900 dark:text-zinc-400">
							Tipo de cuota actual
						</dt>

						<dd className="text-zinc-700 dark:text-zinc-200 sm:col-span-2">
							{cliente!![0].tipo_cuota_actual.nombre}
						</dd>
					</div>
				</dl>
			</div>
		);
	};

	const RutinasTable = () => {
		return (
			<Table.Root>
				<Table.Head>
					<Table.Column name="Fecha de creacion" />
					<Table.Column name="Nombre" />
					<Table.Column name="Descripcion" />
					<Table.Column name="Acciones" />
				</Table.Head>

				<Table.Body>
					{rutinasCliente?.map((rutina, index) => {
						return (
							<Table.Row key={`cuotaClienteRow${rutina.id}`}>
								<Table.RowData value={rutina.fecha_creacion} />
								<Table.RowData value={rutina.nombre} />
								<Table.RowData value={rutina.descripcion} />
								<Table.RowComponent>
									<Link href={`/rutinas/${rutina.id}`}>
										<FontAwesomeIcon
											icon={faEye}
											className="text-primary hover:scale-105"
										/>
									</Link>
								</Table.RowComponent>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table.Root>
		);
	
	};

	const RutinasDataOrNotFound = () => {
		if (cliente?.length != 0) {
			return (
				<>
					<div className="w-full flex flex-col md:flex-row md:justify-between gap-3 items-center">
						<VolverButton />

						<h1 className="w-full text-2xl text-primary text-bold">
							<span>{`Rutinas de ${cliente!![0].nombre} ${cliente!![0].apellido}`}</span>
						</h1>

						<Link href={`/rutinas/new/${id}`}>
							<Button variant="default" size="sm">
								Nueva rutina
							</Button>
						</Link>
					</div>

					<RutinasTable />
				</>
			);
		} else {
			return <NotFound message={"Cliente no encontrado"} />;
		}
	};

	return <>{cliente != null ? <RutinasDataOrNotFound /> : <RowsSkeleton />}</>;
}
