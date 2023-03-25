import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function getSubscriptionsByClientRequest(clientId){
    return await supabase
    .from('cuotas_clientes')
    .select(`id,paga,fecha_cuota,cliente(id,name,fecha_alta),cuota(id,precio_mensual)`)
    .eq("cliente", clientId)
}