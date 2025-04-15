import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { getClienteById } from "@/service/supabase/Clientes";
import { Cliente } from "@/types/Cliente";
import { getRutinasByCliente } from "@/service/supabase/Rutinas";
import { VolverButton } from "./actions";

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
			<table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-400 bg-background text-sm">
				<thead className="ltr:text-left rtl:text-right">
					<tr>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Fecha de creacion
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Nombre
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Descripcion
						</th>
						<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-slate-100">
							Acciones
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-zinc-600">
					{rutinasCliente?.map((rutina, index) => {
						return (
							<tr key={`clientrow${index}`} className="text-center">
								<td className="whitespace-nowrap px-4 py-4 font-medium text-zinc-900 dark:text-slate-100">
									{rutina.fecha_creacion}
								</td>
								<td className="whitespace-nowrap px-4 py-2 text-zinc-700 dark:text-slate-200">
									{rutina.nombre}
								</td>
								<td className="whitespace-nowrap px-4 py-2 text-zinc-700 dark:text-slate-200">
									{rutina.descripcion}
								</td>

								<td className="whitespace-nowrap px-4 py-2 text-zinc-700 dark:text-slate-200">
									<Link href={`/rutinas/${rutina.id}`}>
										<FontAwesomeIcon
											icon={faEye}
											className="text-primary hover:scale-105"
										/>
									</Link>
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
			{cliente != null ? (
				<>
					<div className="w-full flex flex-row gap-3 items-center">
						<VolverButton />
						<h1 className="text-2xl text-primary text-bold">
							<span>{`Rutinas de ${id}`}</span>
						</h1>
					</div>

					<RutinasTable />
				</>
			) : (
				<h1 className="text-lg text-red-600">Cliente NO existe</h1>
			)}
		</>
	);
}
