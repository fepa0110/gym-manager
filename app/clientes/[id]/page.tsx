import { redirect } from "next/navigation";

import { getClienteById } from "@/service/supabase/Clientes";
import { getCuotasByCliente } from "@/service/supabase/Cuotas";

import { createClient } from "@/utils/supabase/server";

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

	const clienteData = await getClienteById(Number(id));

	const cuotasCliente = await getCuotasByCliente(id);

	const CuotasTable = () => {
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
									{cuota.precio}
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
										<button className="px-3 py-2 text-sky-600 uppercase border-2 border-sky-600 rounded-md hover:scale-105 transition-all">
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
			{clienteData != null ? (
				<>
					<h1 className="text-2xl text-primary text-bold">
						{`Cliente ${clienteData[0].nombre} ${clienteData[0].apellido}`}{" "}
					</h1>
					<p>{"Nombre: " + clienteData[0].nombre}</p>
					<p>{"Apellido: " + clienteData[0].apellido}</p>
					<p>{"DNI: " + clienteData[0].dni}</p>

					<h2 className="text-xl text-primary text-bold">Cuotas</h2>
					<CuotasTable />
				</>
			) : (
				<h1 className="text-lg text-red-600">Cliente NO existe</h1>
			)}
		</>
	);
}
