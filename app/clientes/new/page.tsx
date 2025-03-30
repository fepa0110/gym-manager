"use client";

import { SubmitButton } from "@/components/submit-button";
import { useActionState, useEffect } from "react";
import { createCliente } from "./actions";
import Toastify from "toastify-js";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function Page() {
	const initialState = {
		message: "",
		sended: false,
	};

	const [state, formAction, isPending] = useActionState(
		createCliente,
		initialState
	);

	useEffect(() => {
		if (state?.sended) showAlert();
	}, [state?.sended]);

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
				className="flex flex-col p-3 gap-3 rounded-lg border border-zinc-800 dark:border-zinc-400"
				action={formAction}>
				<div className="flex flex-col w-1/4 gap-2">
					<label htmlFor="nombre">Nombre</label>
					<input
						className="py-2 px-2 border border-zinc-600 rounded-md focus:border-primary focus:outline focus:outline-primary"
						type="text"
						id="nombre"
						name="nombre"
						required
					/>
				</div>

				<div className="flex flex-col w-1/4 gap-2">
					<label htmlFor="apellido">Apellido</label>
					<input
						className="py-2 px-2 border border-zinc-600 rounded-md focus:border-primary focus:outline focus:outline-primary"
						type="text"
						id="apellido"
						name="apellido"
						required
					/>
				</div>

				<div className="flex flex-col w-1/4 gap-2">
					<label htmlFor="dni">DNI</label>
					<input
						className="py-2 px-2 border border-zinc-600  rounded-md focus:border-primary focus:outline focus:outline-primary"
						type="text"
						id="dni"
						name="dni"
						required
					/>
				</div>

				<SubmitButton className="w-1/4 mt-3 place-self-center">
					<span>Enviar</span>
				</SubmitButton>
			</form>
		</>
	);
}
