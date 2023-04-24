import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function loginWithEmail(email,password){
    return await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
}

export async function getLoggedUser(){
  return await supabase.auth.getUser();
}

export async function logOut(){
  return await supabase.auth.signOut();
}