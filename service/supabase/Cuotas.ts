import { createClient } from "@/utils/supabase/server";

export async function getCuotasByCliente(clienteId: string) {
	const supabase = await createClient();

	let { data: cuotas, error } = await supabase
		.from("cuotas")
		.select("*")
		.eq("cliente_id", clienteId);

	return cuotas;
}
