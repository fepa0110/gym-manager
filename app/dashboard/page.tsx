import { DashboardCard } from "@/components/ui/dashboard-card";
import { getCuotasImpagas } from "@/service/supabase/client/Cuotas";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

import { redirect } from "next/navigation";
import { CuotasImpagas } from "./actions";

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

			<Link
				className="font-medium text-xl max-w-32 p-6 border-2 border-primary rounded-lg hover:scale-105 transition-transform"
				href="/clientes">
				<button>Clientes</button>
			</Link>
			<div className="w-1/4">
				<CuotasImpagas />
			</div>
		</>
	);
}
