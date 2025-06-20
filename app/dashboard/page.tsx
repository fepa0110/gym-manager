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

			<div className="grid grid-cols-3 sm:grid-cols-5 gap-3 lg:gap-8">
				<Link
					className="flex flex-row min-w-20 max-w-32 min-h-14 max-h-16 justify-center items-center font-medium border border-primary rounded-sm hover:scale-105 transition-transform"
					href="/clientes">
					<button>Clientes</button>
				</Link>
				<Link
					className="flex flex-row min-w-20 max-w-32 min-h-14 max-h-16 justify-center items-center font-medium border border-primary rounded-sm hover:scale-105 transition-transform"
					href="/gym/cuotas">
					<button>Planes</button>
				</Link>
				<div className="col-span-2 sm:col-span-3 lg:col-span-1 row-start-2 sm:row-start-auto lg:row-start-2"><CuotasImpagas /></div>
			</div>

		</>
	);
}
