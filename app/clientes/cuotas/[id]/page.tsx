import { getCuotasByCliente } from "@/service/supabase/Cuotas";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const cuotasCliente = await getCuotasByCliente(id);

	return (
		<>
			<h1 className="text-2xl text-primary">{`Cuotas del cliente ${id}`}</h1>

			<div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-400">
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
						</tr>
					</thead>

					<tbody className="divide-y divide-gray-200">
						{cuotasCliente?.map((cuota) => {
							return (
								<tr key={`clientrow${cuota.id}`}>
									<td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-slate-100">
										{cuota.fecha_creacion}
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
										{cuota.precio}
									</td>
									<td className="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-slate-200">
										{cuota.abonada.toString()}
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
