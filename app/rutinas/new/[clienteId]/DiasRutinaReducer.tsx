enum DiaRutinaType {
	nuevoDia = "NUEVO_DIA",
}

interface DiasRutinaAction {
	type: DiaRutinaType;
	payload: DiaRutina;
}

export default function diasRutinaReducer(diasRutina: DiaRutina[], action: DiasRutinaAction) {
	const { type, payload } = action;

	switch (type) {
		case DiaRutinaType.nuevoDia: {
			return;
			[
				...diasRutina,
				{
					dia: diasRutina.length + 1,
					descripcion: "Dia piernas",
					ejerciciosDia: [
						{
							ejercicio: "",
							series: 1,
							repeticiones: 1,
						},
					],
				},
			];
		}

		default:
			return diasRutina;
	}
}
