import { createClient } from "@/utils/supabase/server";

import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login(props: { searchParams: Promise<Message> }) {
	const searchParams = await props.searchParams;

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		return redirect("/dashboard");
	}

	return (
		<form className="flex-1 flex flex-col justify-center self-center min-w-64">
			<h1 className="text-2xl font-medium">Ingresar</h1>

			<div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
				<Label text="Email" />
				<Input name="email" placeholder="you@example.com" required />
				<div className="flex justify-between items-center">
					<Label text="Contraseña" />
					{/* <Label htmlFor="password">Contraseña</Label> */}
					{/*           <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link> */}
				</div>
				<Input
					type="password"
					name="password"
					placeholder="Contraseña"
					required
				/>
				<SubmitButton pendingText="Ingresando..." formAction={signInAction}>
					Ingresar
				</SubmitButton>
				<FormMessage message={searchParams} />
			</div>
		</form>
	);
}
