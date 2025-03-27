import { Cliente } from "@/types/Cliente";
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

export async function insertCliente(
	cliente: Omit<Cliente, "id" | "fecha_creacion">
) {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("clientes")
		.insert(cliente)
		.select();

	if(error) return false
	
	return true
}
