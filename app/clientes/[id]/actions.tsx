"use client";

import { Table } from "@/components/Table";
import { RowsSkeleton } from "@/components/ui/rows-skeleton";
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
		const cuotaAbonada = await abonarCuota(cuotaId);

		if (cuotaAbonada != undefined) {
			setIsLoading(true);

			showAlert("Cuota abonada correctamente.");

			setCuotasCliente(() => {
				if (cuotasCliente == undefined) return [];
				else
					return cuotasCliente.map((cuota, index) => {
						if (index === cuotaIndex)
							return { ...cuota, abonada: cuotaAbonada[0].abonada };
						else return cuota;
					});
			});

			setIsLoading(false);
		} else showAlert("Error al abonar la cuota.");
	};

	const AbonarButton = ({
		cuotaId,
		cuotaIndex,
	}: {
		cuotaId: any;
		cuotaIndex: number;
	}) => {
		return (
			<button
				onClick={() => sendAbonarCuota(cuotaId, cuotaIndex)}
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
				"box-shadow": "none",
			},
		}).showToast();
	};

	return (
		<Table.Root>
			<Table.Head>
				<Table.Column name="Fecha" />
				<Table.Column name="Tipo de cuota" />
				<Table.Column name="Valor" />
				<Table.Column name="Abonada" />
				<Table.Column name="Acciones" />
			</Table.Head>

			{isLoading ? (
				<TableSkeleton numRows={3} numColumns={5} />
			) : (
				<Table.Body>
					{cuotasCliente?.map((cuota, index) => {
						return (
							<Table.Row key={`cuotaClienteRow${cuota.id}`}>
								<Table.RowData value={cuota.fecha_creacion} />
								<Table.RowData value={cuota.tipo_cuota.nombre} />
								<Table.RowData value={cuota.tipo_cuota.precio} />
								<Table.RowComponent>
									{cuota.abonada ? (
										<span className="text-emerald-600 uppercase">
											Paga
										</span>
									) : (
										<span className="text-red-600 uppercase">
											Impaga
										</span>
									)}
								</Table.RowComponent>
								<Table.RowComponent>
									{!cuota.abonada && (
										<AbonarButton
											cuotaId={cuota.id}
											cuotaIndex={index}
										/>
									)}
								</Table.RowComponent>
							</Table.Row>
						);
					})}
				</Table.Body>
			)}
		</Table.Root>
	);
};
