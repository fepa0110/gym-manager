"use client";

export const RutinaBasicDataForm = () => {
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

export const RutinaForm = () => {
    return(
        <section className="flex flex-col items-center gap-3">
            <RutinaBasicDataForm />

            <button className="max-w-64 px-3 py-2 border border-primary border-dashed rounded-lg text-primary hover:scale-105 transition-all">
                Agregar día
            </button>
        </section>
    )
}