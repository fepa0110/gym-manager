import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		return redirect("/dashboard");
	}

	return (
		<>
			<div className="flex flex-col gap-16 justify-center items-center">
				<p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
					GymManager
				</p>
				<div className="w-full p-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-8 mt-4" />
			</div>

			<main className="flex-1 flex flex-col gap-6 px-4">

			</main>
		</>
	);
}
