"use server";

import { insertCliente } from "@/service/supabase/Clientes";
import { Cliente } from "@/types/Cliente";
import { z } from "zod";

export async function createCliente(
	prevState: {
		message: string;
	},
	formData: FormData
) {
	const clienteSchema = z.object({
		nombre: z.string().min(1).max(25),
		apellido: z.string().min(1).max(25),
		dni: z.string().min(8).max(10),
	});

	const validateData = clienteSchema.safeParse({
		nombre: formData.get("nombre"),
		apellido: formData.get("apellido"),
		dni: formData.get("dni"),
	});

	if (!validateData.success) {
		return { message: "No se pudo crear el cliente" };
	}

	const clienteData: Omit<Cliente, "id" | "fecha_creacion"> =
		validateData.data;

	if (await insertCliente(clienteData)) {
		return { message: "Cliente creado correctamente." };
	}
    else return { message: "No se pudo crear el cliente" };
}
