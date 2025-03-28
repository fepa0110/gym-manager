import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function ResetPassword(props: {
	searchParams: Promise<Message>;
}) {
	const searchParams = await props.searchParams;
	return (
		<form className="flex flex-col w-full max-w-md p-4 gap-2 [&>input]:mb-4">
			<h1 className="text-2xl font-medium">Reiniciar contraseña</h1>
			<p className="text-sm text-foreground/60">
				Por favor ingresa la nueva contraseña debajo.
			</p>
			<Label text="Nueva contraseña" />
			<Input
				type="password"
				name="password"
				placeholder="New password"
				required
			/>
			<Label text="Confirmar Contraseña" />
			<Input
				type="password"
				name="confirmPassword"
				placeholder="Confirm password"
				required
			/>
			<SubmitButton formAction={resetPasswordAction}>
				Reiniciar contraseña
			</SubmitButton>
			<FormMessage message={searchParams} />
		</form>
	);
}
