"use server"

import { createClient } from "@/utils/supabase/server";

export async function getAllTipoCuotas() {
    const supabase = await createClient();

    let { data: tipoCuotas, error } = await supabase
        .from("tipo_cuotas")
        .select("*")

    return tipoCuotas;
}