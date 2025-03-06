import { createClient } from "@/utils/supabase/server";

export async function getClientes() {
	const supabase = await createClient();
	const { data: clientes } = await supabase.from("clientes").select("*");

    return clientes
};
