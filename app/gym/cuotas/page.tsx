"use client";

import { Table } from "@/components/Table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Tooltip } from "@/components/ui/tooltip";
import { getAllTipoCuotas } from "@/service/supabase/client/TipoCuotas";
import { Cuota } from "@/types/Cuota";
import { TipoCuota } from "@/types/TipoCuota";
import { createClient } from "@/utils/supabase/client";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faDumbbell, faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const supabase = createClient();
	const router = useRouter();

	const user = supabase.auth.getUser();

	if (!user) {
		return router.replace("/login");
	}

	const [tipoCuotas, setTipoCuotas] = useState<TipoCuota[] | null>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		getTipoCuotasData();
	}, []);

	const getTipoCuotasData = async () => {
		setIsLoading(true);

		const data = await getAllTipoCuotas();
		setTipoCuotas(data);

		setIsLoading(false);
	};

	const TipoCuotaAcciones = ({ tipoCuotaId }: { tipoCuotaId: string }) => {
		return (
			<span className="inline-flex divide-x divide-zinc-700 overflow-hidden rounded border-0 border-zinc-700 bg-background shadow-sm">
				<Link
					href={`/gym/cuotas/${tipoCuotaId}`}
					className="has-tooltip px-3 py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 transition-colors hover:text-primary hover:dark:text-primary focus:relative">
					<Tooltip text="Editar" />
					<FontAwesomeIcon icon={faPencil} size="sm" />
				</Link>
			</span>
		);
	};

	return (
		<>
			<h1 className="text-2xl text-primary">Clientes</h1>

			<Table.Root>
				<Table.Head>
					<Table.Column name="Nombre" />
					<Table.Column name="Descripcion" />
					<Table.Column name="Precio" />
					<Table.Column name="Acciones" />
				</Table.Head>
				{isLoading ? (
					<TableSkeleton numRows={3} numColumns={3} />
				) : (
					<Table.Body>
						{tipoCuotas?.map((tipoCuota) => {
							return (
								<Table.Row key={`tipoCuotaRow${tipoCuota.id}`}>
									<Table.RowData value={tipoCuota.nombre} />
									<Table.RowData value={tipoCuota.descripcion || ""} />
									<Table.RowData value={`$${tipoCuota.precio.toString()}`} />
									<Table.RowComponent>
										<TipoCuotaAcciones tipoCuotaId={tipoCuota.id.toString()} />
									</Table.RowComponent>
								</Table.Row>
							);
						})}
					</Table.Body>
				)}
			</Table.Root>
		</>
	);
}
