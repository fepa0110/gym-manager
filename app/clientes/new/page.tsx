"use client";

import { useActionState, useEffect, useState } from "react";
import { createClient } from '@/utils/supabase/client'
import { createCliente } from "./actions";

import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";

import Toastify from "toastify-js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getAllTipoCuotas } from "@/service/supabase/client/TipoCuotas";

// import { getAllTipoCuotas } from "@/service/supabase/TipoCuotas";

export default function Page() {
	const initialState = {
		message: "",
		sended: false,
	};

	const [state, formAction, isPending] = useActionState(
		createCliente,
		initialState
	);

	const [tiposCuotas, setTiposCuotas] = useState<any[] | null>([]);

	useEffect(() => {
		getData();
	},[]);

	useEffect(() => {
		if (state?.sended) showAlert();
	}, [state?.sended]);

	const getData = async () => {
		const data = await getAllTipoCuotas()
		setTiposCuotas(data);
	};

	const showAlert = () => {
		Toastify({
			text: state?.message,
			duration: 3000,
			newWindow: true,
			close: true,
			gravity: "top", // `top` or `bottom`
			position: "right", // `left`, `center` or `right`
			stopOnFocus: true,
			style: {
				background: "hsl(var(--primary))",
				color: "white",
			},
		}).showToast();
	};

	return (
		<>
			<div className="w-full mb-3">
				<Link
					href="/clientes"
					className="flex flex-row w-28 px-3 py-2 justify-between items-center border border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-100 hover:scale-105">
					<FontAwesomeIcon icon={faArrowLeft} size="lg" />
					Clientes
				</Link>
			</div>

			<div className="flex flex-row w-full justify-between items-center">
				<h1 className="text-2xl text-primary">Nuevo cliente</h1>
			</div>

			<form
				className="flex flex-col justify-center p-3 gap-3 rounded-lg border border-zinc-800 dark:border-zinc-400"
				action={formAction}>
				<section className="flex flex-col md:flex-row w-full md:justify-start items-center gap-6">
					<div className="flex flex-col md:w-1/4 gap-2">
						<label
							htmlFor="nombre"
							className="text-zinc-700 dark:text-zinc-100">
							Nombre
						</label>
						<input
							className="py-2 px-2 border border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
							type="text"
							id="nombre"
							name="nombre"
							required
						/>
					</div>

					<div className="flex flex-col md:w-1/4 gap-2">
						<label
							htmlFor="apellido"
							className="text-zinc-700 dark:text-zinc-100">
							Apellido
						</label>
						<input
							className="py-2 px-2 border border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
							type="text"
							id="apellido"
							name="apellido"
							required
						/>
					</div>
				</section>

				<div className="flex flex-col self-center md:self-start justify-center items-center md:items-start w-3/5 md:w-full gap-2 pt-3">
					<label
						htmlFor="dni"
						className="text-zinc-700 dark:text-zinc-100">
						DNI
					</label>
					<input
						className="py-2 px-2 border md:w-1/4 border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
						type="text"
						id="dni"
						name="dni"
						required
					/>
				</div>

				<div className="flex flex-col self-center md:self-start justify-center items-center md:items-start w-3/5 md:w-full gap-2 pt-3">
					<label htmlFor="tipo_cuota_actual">
						<span className="text-sm font-medium text-zinc-700 dark:text-zinc-100">
							Tipo de cuota
						</span>
					</label>
					<select
						name="tipo_cuota_actual"
						id="tipo_cuota_actual"
						className="py-2 px-2 border text-zinc-800 dark:text-zinc-100 md:w-1/4 border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary">
						{tiposCuotas?.map((tipoCuota) => {
							return (
								<option
									key={`tipoCuota${tipoCuota.id}`}
									value={tipoCuota.id}>
									{`${tipoCuota.nombre} - $${tipoCuota.precio}`}
								</option>
							);
						})}
					</select>
				</div>

				<SubmitButton className="w-1/4 mt-3 place-self-center">
					<span>Enviar</span>
				</SubmitButton>
			</form>
		</>
	);
}
