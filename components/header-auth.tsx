import { signOutAction } from "@/app/actions";
import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <button className="flex flex-row px-3 py-2 rounded-lg border-2 border-primary/75 text-primary hover:scale-105 transition-all">
        <Link href="/dashboard">
          Dashboard
        </Link>
      </button>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Salir
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Ingresar</Link>
      </Button>
      {/* <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Registrarse</Link>
      </Button> */}
    </div>
  );
}
