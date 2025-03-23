import { createClient } from "@/utils/supabase/server";

export async function getClientes() {
	const supabase = await createClient();
	const { data: clientes } = await supabase.from("clientes").select("*");

	return clientes;
}

export async function getClienteById(id: number) {
	const supabase = await createClient();
	let { data: cliente } = await supabase
		.from("clientes")
		.select("*")
		.eq("id", id);

	return cliente;
}
