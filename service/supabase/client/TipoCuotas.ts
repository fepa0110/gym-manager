import { createClient } from '@/utils/supabase/client'

export async function getAllTipoCuotas() {
    const supabase = await createClient();

    let { data: tipoCuotas, error } = await supabase
        .from("tipo_cuotas")
        .select("*")

    return tipoCuotas;
}