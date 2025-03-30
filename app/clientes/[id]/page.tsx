// "use client";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { getClienteById } from "@/service/supabase/Clientes";
import { abonarCuota, getCuotasByCliente } from "@/service/supabase/Cuotas";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

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

	// const [cliente, setCliente] = useState<any[] | null>(null);
	// const [cuotasCliente, setCuotasCliente] = useState<any[] | null>(null);

	/* useEffect(() => {
		const getData = async () => {
			setCliente(await getClienteById(Number(id)));
			setCuotasCliente(await getCuotasByCliente(id));
		};

		getData()
	}, []); */

	const cliente = await getClienteById(Number(id))
	const cuotasCliente = await getCuotasByCliente(id)


	async function enviarAbonarCuota(cuotaId: number) {
		await abonarCuota(cuotaId);
	}

	const CuotasTable = () => {
		"use client";

		return (
			<table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-400 bg-background text-sm">
				<thead className="ltr:text-left rtl:text-right">
					<tr>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Fecha
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Precio
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Abonada
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Acciones
						</th>
					</tr>
				</thead>

				<tbody className="divide-y divide-gray-200">
					{cuotasCliente?.map((cuota) => {
						return (
							<tr key={`clientrow${cuota.id}`} className="text-center">
								<td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-slate-100">
									{cuota.fecha_creacion}
								</td>
								<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
									{/* {`$${cuota.tipo_cuota.precio}`} */}
									{`$30000`}
								</td>
								<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
									{cuota.abonada ? (
										<span className="text-emerald-600 uppercase">
											Paga
										</span>
									) : (
										<span className="text-red-600 uppercase">
											Impaga
										</span>
									)}
								</td>
								<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
									{!cuota.abonada && (
										<button
											// onClick={() => enviarAbonarCuota(cuota.id)}
											className="px-3 py-2 text-sky-600 uppercase border-2 border-sky-600 rounded-md hover:scale-105 transition-all">
											Abonar
										</button>
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	};

	return (
		<>
			<div className="w-full">
				<Link
					href="/clientes"
					className="flex flex-row w-28 px-3 py-2 justify-between items-center border border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-100 hover:scale-105">
					<FontAwesomeIcon icon={faArrowLeft} size="lg" />
					Clientes
				</Link>
			</div>

			{cliente != null ? (
				<>
					<h1 className="text-2xl text-primary text-bold">
						{`Cliente ${cliente[0].nombre} ${cliente[0].apellido}`}{" "}
					</h1>
					<p>{"Nombre: " + cliente[0].nombre}</p>
					<p>{"Apellido: " + cliente[0].apellido}</p>
					<p>{"DNI: " + cliente[0].dni}</p>
					<p>{"Tipo de cuota actual: " + "Cuota básica"}</p>
					<h2 className="text-xl text-primary text-bold">Cuotas</h2>
					<CuotasTable />
				</>
			) : (
				<h1 className="text-lg text-red-600">Cliente NO existe</h1>
			)}
		</>
	);
}
