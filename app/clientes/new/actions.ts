"use server";

import { insertCliente } from "@/service/supabase/Clientes";
import { Cliente } from "@/types/Cliente";
import { z } from "zod";

export async function createCliente(
	prevState: {
		message: string;
		sended: boolean;
	},
	formData: FormData
) {
	const clienteSchema = z.object({
		nombre: z.string().min(1).max(25),
		apellido: z.string().min(1).max(25),
		dni: z.string().min(0).max(10),
		observaciones: z.string(),
		tipo_cuota_actual: z.string(),
		fecha_creacion: z.any()
	});

	const validateData = clienteSchema.safeParse({
		nombre: formData.get("nombre"),
		apellido: formData.get("apellido"),
		dni: formData.get("dni"),
		observaciones: formData.get("observaciones"),
		tipo_cuota_actual: formData.get("tipo_cuota_actual"),
		fecha_creacion: formData.get("fecha_creacion")
	});

	if (!validateData.success) {
		return { message: "No se pudo crear el cliente", sended: true };
	}

	const clienteData: Omit<Cliente, "id" | "fecha_creacion"> =
		validateData.data;

	console.log(clienteData);
	
	if (await insertCliente(clienteData)) {
		return { message: "Cliente creado correctamente.", sended: true };
	} else {
		return { message: "No se pudo crear el cliente", sended: true };
	}
}
