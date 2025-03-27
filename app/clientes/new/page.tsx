"use client";

import { SubmitButton } from "@/components/submit-button";
import { useActionState } from "react";
import { createCliente } from "./actions";
import { Alert } from "@/components/ui/alert";

const initialState = {
	message: "",
};

export default function Page() {
	const [state, formAction] = useActionState(createCliente, initialState);

	function showAlert() {
		setTimeout(() => {
			state.message = "";
		}, 1000);

		return <Alert message={state?.message} />;
	}

	return (
		<>
			<div className="flex flex-row w-full justify-between items-center">
				<h1 className="text-2xl text-primary">Nuevo cliente</h1>
			</div>

			<div className="absolute top-0 right-0 pr-3 pt-3">
				{state?.message != "" ? showAlert() : null}
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

				<p aria-live="polite" className="" role="status">
					{"Mensaje: " + state?.message}
				</p>

				<SubmitButton className="w-1/4 mt-3 place-self-center">
					<span>Enviar</span>
				</SubmitButton>
			</form>
		</>
	);
}
