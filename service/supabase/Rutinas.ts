import { createClient } from "@/utils/supabase/server";

export async function getRutinasByCliente(clienteId: string) {
    const supabase = await createClient();

    let { data: cuotas, error } = await supabase
        .from("rutinas")
        .select('*')
        .eq("cliente_id", clienteId)
        .order("fecha_creacion", { ascending: false });

    return cuotas;
}