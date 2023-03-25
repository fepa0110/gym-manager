import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getClientsRequest() {
	return await supabase.from("clientes").select("*");
}

export async function getClientByIdRequest(clientId) {
	return await supabase.from("clientes").select("*").eq("id", clientId);
}
