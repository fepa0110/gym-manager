import { createClient } from '@supabase/supabase-js'
import env from "react-dotenv";


export async function getClientsRequest(){
    const supabaseUrl = env.SUPABASE_URL
    const supabaseKey = env.SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    return await supabase
    .from('clientes')
    .select('*')
}