import { getClientes } from "@/service/supabase/Clientes";
import { Cliente } from "@/types/Cliente";
import { createClient } from "@/utils/supabase/server";
import { Temporal } from "temporal-polyfill";
import { faEye, faLaptop, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	const clientes = await getClientes();

	return (
		<>
			<h1 className="text-2xl text-primary">Clientes</h1>
			<div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-400">
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
								Fecha de alta
							</th>
							<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
								
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-200">
						{clientes?.map((cliente) => {
							return (
								<tr key={`clientrow${cliente.id}`}>
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
										{cliente.fecha_creacion}
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
										<Link href={`/clientes/${cliente.id}`}>
											<FontAwesomeIcon icon={faEye} className="text-primary"/>
										</Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
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
