import { useActionState, useEffect, useState } from "react";

import Link from "next/link";

import Toastify from "toastify-js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getAllTipoCuotas } from "@/service/supabase/client/TipoCuotas";
import { Temporal } from "temporal-polyfill";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getClienteById } from "@/service/supabase/Clientes";
import { NotFound } from "@/components/not-found";
import { RutinaBasicDataForm, RutinaForm } from "./actions";

export default async function Page({
	params,
}: {
	params: Promise<{ clienteId: string }>;
}) {
	const { clienteId } = await params;

	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/sign-in");
	}

	const cliente: any[] | null = await getClienteById(Number(clienteId));
	/*     useEffect(() => {
        getData();
    }, []); */

	/*     useEffect(() => {
        if (state?.sended) showAlert();
    }, [state?.sended]); */

	/*     const getData = async () => {
        const data = await getAllTipoCuotas();
        setTiposCuotas(data);
    }; */

	const showAlert = (message: string) => {
		Toastify({
			text: message,
			duration: 3000,
			newWindow: true,
			close: true,
			gravity: "top", // `top` or `bottom`
			position: "right", // `left`, `center` or `right`
			stopOnFocus: true,
			style: {
				background: "hsl(var(--primary))",
				color: "white",
				"box-shadow": "none",
			},
		}).showToast();
	};

	return (
		<>
			<div className="w-full flex flex-row gap-3 items-center">
				{cliente != null ? (
					<div className="flex flex-col w-full gap-1">
						<h1 className="text-2xl text-primary text-bold">
							<span>Nueva rutina</span>
						</h1>

						<span className="text-lg text-zinc-500">
							{`${cliente[0].nombre} ${cliente[0].apellido}`}
						</span>

						<RutinaForm />
					</div>
				) : (
					<NotFound message={"Cliente no encontrado"} />
				)}
			</div>
		</>
	);
}
