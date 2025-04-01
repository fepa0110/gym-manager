import { Cuota } from "@/types/Cuota";
import { createClient } from "@/utils/supabase/client";

export async function getCuotasByCliente(clienteId: string) {
	const supabase = await createClient();

	let { data: cuotas, error } = await supabase
		.from("cuotas")
		.select(
			`
			id,
			fecha_creacion,
			abonada,
			tipo_cuota (
				precio
			)`
		)
		.eq("cliente_id", clienteId)
		.order("fecha_creacion", { ascending: false });

	return cuotas;
}

export async function abonarCuota(cuotaId: number) {
	const supabase = await createClient();

	const { data: cuotaEditada, error } = await supabase
		.from("cuotas")
		.update({ abonada: true })
		.eq("id", cuotaId)
		.select();

	return cuotaEditada;
}
