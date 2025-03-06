import checkSignInAndRedirect from "@/utils/supabase/checkUserSigIn";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return (
		<h1 className="text-lg text-primary text-bold">{`Cliente ${id}`} </h1>
	);
}
