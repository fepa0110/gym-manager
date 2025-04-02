"use client";

import { TableSkeleton } from "@/components/ui/table-skeleton";
import {
	abonarCuota,
	getCuotasByCliente,
} from "@/service/supabase/client/Cuotas";
import { useEffect, useState } from "react";
import Toastify from "toastify-js";

export const CuotasTable = (clienteId: { clienteId: string }) => {
	const [cuotasCliente, setCuotasCliente] = useState<any[] | null>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getCuotasClienteData();
	}, []);

	const getCuotasClienteData = async () => {
		setIsLoading(true);
		const data = await getCuotasByCliente(clienteId.clienteId);
		setCuotasCliente(data);
		setIsLoading(false);
	};

    const sendAbonarCuota = async (cuotaId: string, cuotaIndex: number) => {
        const cuotaAbonada = await abonarCuota(cuotaId)

        if(cuotaAbonada != undefined) {
            setIsLoading(true)

            showAlert("Cuota abonada correctamente.")

            setCuotasCliente(() => {
                if(cuotasCliente == undefined) return []
                else return cuotasCliente.map((cuota, index) => {
                    if(index === cuotaIndex) return {...cuota, abonada: cuotaAbonada[0].abonada }
                    else return cuota
                })
            })

            setIsLoading(false)
        }
        else showAlert("Error al abonar la cuota.")
    }

	const AbonarButton = ({cuotaId, cuotaIndex}: {cuotaId: any, cuotaIndex: number}) => {
		return (
			<button
				onClick={() => sendAbonarCuota(cuotaId , cuotaIndex)}
				className="px-3 py-2 text-sky-600 uppercase border-2 border-sky-600 rounded-md hover:bg-sky-800/50 hover:text-sky-100 transition-all">
				Abonar
			</button>
		);
	};

	const showAlert = (message: string) => {
		Toastify({
			text: message,
			duration: 4000,
			newWindow: true,
			close: true,
			gravity: "top", // `top` or `bottom`
			position: "right", // `left`, `center` or `right`
			stopOnFocus: true,
			style: {
				background: "hsl(var(--primary))",
				color: "white",
                "box-shadow": "none" 
			},
		}).showToast();
	};

	return isLoading ? (
		<TableSkeleton />
	) : (
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
			<tbody className="divide-y divide-zinc-600">
				{cuotasCliente?.map((cuota, index) => {
					return (
						<tr key={`clientrow${cuota.id}`} className="text-center">
							<td className="whitespace-nowrap px-4 py-4 font-medium text-zinc-900 dark:text-slate-100">
								{cuota.fecha_creacion}
							</td>
							<td className="whitespace-nowrap px-4 py-2 text-zinc-700 dark:text-slate-200">
								{`${cuota.tipo_cuota.nombre}`}
							</td>
							<td className="whitespace-nowrap px-4 py-2 text-zinc-700 dark:text-slate-200">
								{`$${cuota.tipo_cuota.precio}`}
							</td>
							<td className="whitespace-nowrap px-4 py-2 text-zinc-700 dark:text-slate-200">
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
							<td className="whitespace-nowrap px-4 py-2 text-zinc-700 dark:text-slate-200">
								{!cuota.abonada && <AbonarButton cuotaId={cuota.id} cuotaIndex={index} />}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};
