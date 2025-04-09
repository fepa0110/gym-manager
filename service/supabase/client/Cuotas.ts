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
				nombre,
				precio
			)`
		)
		.eq("cliente_id", clienteId)
		.order("fecha_creacion", { ascending: false });

	return cuotas;
}

export async function abonarCuota(cuotaId: string) {
	const supabase = await createClient();

	const { data: cuotaEditada, error } = await supabase
		.from("cuotas")
		.update({ abonada: "true" })
		.eq("id", cuotaId)
		.select();

	return cuotaEditada;
}

export async function getCuotasImpagas(){
	const supabase = await createClient();

	const { count, error } = await supabase
		.from("cuotas")
		.select('*', { count: 'exact', head: true })
		.eq("abonada", "false")

	return count;
}