import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { getClienteById } from "@/service/supabase/Clientes";
import { CuotasTable } from "./actions";

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
	// const cuotasCliente: any[] | null = await getCuotasByCliente(id);

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

					<CuotasTable clienteId={id} />
				</>
			) : (
				<h1 className="text-lg text-red-600">Cliente NO existe</h1>
			)}
		</>
	);
}
