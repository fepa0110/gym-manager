import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import { redirect } from "next/navigation";

export default async function Page() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	return (
		<>
			<h1 className="text-2xl text-primary font-bold">Dashboard</h1>

			<Link className="font-medium text-xl max-w-32 p-6 border-2 border-primary rounded-lg hover:scale-105 transition-transform" href="/clientes">
				<button>
					Clientes
				</button>
			</Link>

			<div className="flex flex-col w-32 h-32 border-2 border-primary rounded-lg justify-center items-center">
				<h1 className="text-lg text-primary text-center">Cuotas impagas</h1>
				<p className="text-2xl text-zinc-600 dark:text-white text-center">15</p>
			</div>

			
		</>
	);
}
