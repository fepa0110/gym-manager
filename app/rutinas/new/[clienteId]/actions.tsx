"use client";

import { useEffect, useState } from "react";

const RutinaBasicDataForm = () => {
	return (
		<fieldset
			title="Información de rutina"
			className="grid grid-cols-1 md:grid-cols-2 w-3/4 justify-center md:justify-start items-center gap-6">
			<legend className="w-full text-primary dark:text-primary/75 text-base mb-2 border-b border-primary/75">
				Información de rutina
			</legend>

			<div className="flex flex-col md:w-full gap-2">
				<label
					htmlFor="nombreRutina"
					className="text-zinc-700 dark:text-zinc-100">
					Nombre
					<span className="text-primary dark:text-primary/75 cursor-none">
						{" "}
						*
					</span>
				</label>
				<input
					className="py-2 px-2 border border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
					type="text"
					id="nombreRutina"
					name="nombreRutina"
					autoComplete="off"
					required
				/>
			</div>

			<div className="flex flex-col md:w-full gap-2">
				<label
					htmlFor="descripcionRutina"
					className="text-zinc-700 dark:text-zinc-100">
					Descripcion
				</label>
				<input
					className="py-2 px-2 border border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
					type="text"
					id="descripcionRutina"
					name="descripcionRutina"
					autoComplete="off"
				/>
			</div>
		</fieldset>
	);
};

const EjercicioDiaSection = ({ejercicioDia}: {
	ejercicioDia: EjercicioDia;
}) => {
	return (
		<fieldset>
			<div className="flex flex-col md:w-full gap-2">
				<label
					htmlFor="ejercicio"
					className="text-zinc-700 dark:text-zinc-100">
					Ejercicio
					<span className="text-primary dark:text-primary/75 cursor-none">
						{" "}
						*
					</span>
				</label>
				<input
					className="py-2 px-2 border border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
					type="text"
					id="ejercicio"
					name="ejercicio"
					autoComplete="off"
					defaultValue={ejercicioDia.ejercicio}
					required
				/>
			</div>

			<div className="flex flex-col md:w-full gap-2">
				<label
					htmlFor="series"
					className="text-zinc-700 dark:text-zinc-100">
					Series
				</label>
				<input
					className="py-2 px-2 border border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
					type="number"
					id="series"
					name="series"
					autoComplete="off"
					defaultValue={ejercicioDia.series}
				/>
			</div>

			<div className="flex flex-col md:w-full gap-2">
				<label
					htmlFor="repeticiones"
					className="text-zinc-700 dark:text-zinc-100">
					Repeticiones
				</label>
				<input
					className="py-2 px-2 border border-zinc-600 bg-background rounded-md focus:border-primary focus:outline focus:outline-primary"
					type="number"
					id="repeticiones"
					name="repeticiones"
					autoComplete="off"
					defaultValue={ejercicioDia.repeticiones}
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
					defaultValue={ejercicioDia.observaciones}
				/>
			</div>
		</fieldset>
	);
};

const DiasRutinaData = ({ diasRutina }: { diasRutina: DiaRutina[] }) => {
	return (
		<section className="w-3/4 my-3">
			{diasRutina.map((diaRutina) => {
				return (
					<section
						key={`diaRutinaSection${diaRutina.dia}`}
						className="w-full my-3 p-3 border border-primary rounded-lg">
						<h3 className="text-lg text-primary">
							{`Día ${diaRutina.dia}`}
						</h3>

						{diaRutina.ejerciciosDia.map(
							(ejercicioDia, indexEjercicioDia) => {
								return (
									<EjercicioDiaSection
										key={`diaRutina${diaRutina.dia}ejercicioDia${indexEjercicioDia}`}
										ejercicioDia={ejercicioDia}
									/>
								);
							}
						)}
					</section>
				);
			})}
		</section>
	);
};

export const RutinaForm = () => {
	const [diasRutina, setDiasRutina] = useState<DiaRutina[]>([]);

	function nuevoDiaRutina() {
		setDiasRutina((prevState) => [
			...prevState,
			{
				dia: prevState.length + 1,
				descripcion: "Dia piernas",
				ejerciciosDia: [
					{
						ejercicio: "",
						series: 1,
						repeticiones: 1,
					},
				],
			},
		]);
	}

	useEffect(() => {
		nuevoDiaRutina();
	}, []);

	return (
		<section className="flex flex-col items-center justify-center gap-3">
			<RutinaBasicDataForm />

			<DiasRutinaData diasRutina={diasRutina} />

			<button
				className="max-w-64 px-3 py-2 border border-primary border-dashed rounded-lg text-primary hover:scale-105 transition-all"
				onClick={nuevoDiaRutina}>
				Agregar día
			</button>
		</section>
	);
};
