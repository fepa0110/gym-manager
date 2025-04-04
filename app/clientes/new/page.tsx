"use client";

import { useActionState, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { createCliente } from "./actions";

import Link from "next/link";
import { SubmitButton } from "@/components/submit-button";

import Toastify from "toastify-js";
import { DatePicker } from "@heroui/date-picker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getAllTipoCuotas } from "@/service/supabase/client/TipoCuotas";
import { redirect } from "next/navigation";
import { Temporal } from "temporal-polyfill";
import {
	CalendarDate,
	getLocalTimeZone,
	parseAbsoluteToLocal,
	parseZonedDateTime,
	today,
	ZonedDateTime,
} from "@internationalized/date";

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

	const instant = Temporal.Now.instant();

	const [tiposCuotas, setTiposCuotas] = useState<any[] | null>([]);
	const [fechaCreacion, setFechaCreacion] = useState<CalendarDate | null>();

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		if (state?.sended) showAlert();
	}, [state?.sended]);

	const getData = async () => {
		const data = await getAllTipoCuotas();
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
				"box-shadow": "none",
			},
		}).showToast();
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
					<span>Nuevo cliente</span>
				</h1>
			</div>

			<form
				className="flex flex-col justify-center items-center py-6 gap-3 rounded-lg border border-zinc-800 dark:border-zinc-400"
				action={formAction}>
				<fieldset
					title="Datos personales"
					className="grid grid-cols-1 md:grid-cols-2 w-3/4 justify-center md:justify-start items-center gap-6">
					<legend className="w-full text-primary dark:text-primary/75 text-base mb-2 border-b border-primary/75">Datos Personales</legend>

					<div className="flex flex-col md:w-full gap-2">
						<label
							htmlFor="nombre"
							className="text-zinc-700 dark:text-zinc-100">
							Nombre<span className="text-primary dark:text-primary/75 cursor-none"> *</span>
						</label>
						<input
							className="py-2 px-2 border border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
							type="text"
							id="nombre"
							name="nombre"
							autoComplete="off"
							required
						/>
					</div>

					<div className="flex flex-col md:w-full gap-2">
						<label
							htmlFor="apellido"
							className="text-zinc-700 dark:text-zinc-100">
							Apellido<span className="text-primary dark:text-primary/75 cursor-none"> *</span>
						</label>
						<input
							className="py-2 px-2 border border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
							type="text"
							id="apellido"
							name="apellido"
							autoComplete="off"
							required
						/>
					</div>

					<div className="flex flex-col md:w-full gap-2">
						<label
							htmlFor="dni"
							className="text-zinc-700 dark:text-zinc-100">
							DNI
						</label>
						<input
							className="py-2 px-2 border border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
							type="text"
							id="dni"
							name="dni"
							autoComplete="off"
						/>
					</div>

					<div className="flex flex-col md:w-full gap-2">
						<label
							htmlFor="observaciones"
							className="text-zinc-700 dark:text-zinc-100">
							Observaciones
						</label>
						<input
							className="py-2 px-2 border border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
							type="text"
							id="observaciones"
							name="observaciones"
							autoComplete="off"
						/>
					</div>
				</fieldset>

				<fieldset
					title="Cuota"
					className="grid grid-cols-1 md:grid-cols-2 w-3/4 mt-4 justify-center md:justify-start items-center gap-6">
					<legend className="w-full text-primary dark:text-primary/75 text-base mb-2 border-b border-primary/75">Cuota</legend>
					<div className="flex flex-col md:w-full gap-2">
						<label htmlFor="tipo_cuota_actual">
							<span className="text-sm font-medium text-zinc-700 dark:text-zinc-100">
								Tipo de cuota
							</span>
						</label>
						<select
							name="tipo_cuota_actual"
							id="tipo_cuota_actual"
							className="py-2 px-2 text-sm md:text-base border text-zinc-800 dark:text-zinc-100 md:w-auto border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary">
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

					<div className="flex flex-col md:w-full gap-2">
						<label htmlFor="fecha_creacion">
							<span className="text-sm font-medium text-zinc-700 dark:text-zinc-100">
								Fecha de inicio
							</span>
						</label>
						<DatePicker
							id="fecha_creacion"
							name="fecha_creacion"
							className="max-w-[300px]"
							aria-label="Fecha de inicio"
							granularity="day"
							defaultValue={today(getLocalTimeZone())}
							value={fechaCreacion}
							onChange={setFechaCreacion}
							showMonthAndYearPickers
							variant="bordered"
							radius="sm"
						/>
					</div>
				</fieldset>

				<SubmitButton className="w-1/4 md:mt-6 place-self-center">
					<span>Enviar</span>
				</SubmitButton>
			</form>
		</>
	);
}
