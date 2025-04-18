import { Cliente } from "@/types/Cliente";
import { createClient } from "@/utils/supabase/server";

export async function getClientes() {
	const supabase = await createClient();
	const { data: clientes } = await supabase
		.from("clientes")
		.select("*")
		.range(0, 7);

	return clientes;
}

export async function getClienteById(id: number) {
	const supabase = await createClient();

	let { data: cliente, error } = await supabase
		.from("clientes")
		.select(
			`
			id,
			nombre,
			apellido,
			dni,
			observaciones,
			tipo_cuota_actual (
				nombre
			)`
		)
		.eq("id", id);

	return cliente;
}

export async function insertClienteConFecha(
	cliente: Omit<Cliente, "id">
) {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("clientes")
		.insert(cliente)
		.select();

	if (error) {
		console.error(error);
		return false;
	}

	return true;
}

export async function insertCliente(
	cliente: Omit<Cliente, "id" | "fecha_creacion">
) {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("clientes")
		.insert(cliente)
		.select();

	if (error) {
		console.error(error);
		return false;
	}

	return true;
}
