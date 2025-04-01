// "use client";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Cliente } from "@/types/Cliente";
import { getCuotasByCliente } from "@/service/supabase/Cuotas";

import { getClienteById } from "@/service/supabase/Clientes";

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
	const cuotasCliente: any[] | null = await getCuotasByCliente(id);

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
							Tipo de cuota
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Valor
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
									{`${cuota.tipo_cuota.nombre}`}
								</td>
								<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
									{`$${cuota.tipo_cuota.precio}`}
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
			<div className="w-full flex flex-row gap-3 items-center">
				<Link
					href="/clientes"
					className="flex flex-row w-28 px-3 py-2 justify-between items-center border border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-100 hover:scale-105">
					<FontAwesomeIcon icon={faArrowLeft} size="lg" />
					Clientes
				</Link>
				<h1 className="text-2xl text-primary text-bold">
					<span>Planilla del cliente</span>
				</h1>
			</div>

			{cliente != null ? (
				<>
					<ClientePersonalData />

					<h2 className="text-xl text-primary text-bold">Cuotas</h2>
					<CuotasTable />
				</>
			) : (
				<h1 className="text-lg text-red-600">Cliente NO existe</h1>
			)}
		</>
	);
}
