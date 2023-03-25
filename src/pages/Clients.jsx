import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { getClientAmountPayableRequest, getClientsRequest } from "../services/ClientService";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

export default function Clients() {
	const [clients, setClients] = useState([]);

	useEffect(() => {
		// getClients();
		setClients([
			{ id: 1, name: "Fabricio", fecha_alta: "2023-12-02" },
			{ id: 2, name: "Patricio", fecha_alta: "2023-03-19" },
			{ id: 3, name: "Juan Pablo", fecha_alta: "2023-03-19" },
		]);
	}, []);

	const getClients = async () => {
		let { data: clientes } = await getClientsRequest();

		setClients(clientes);
	};

	return (
		<>
			<Header />
			<div className="w-auto p-10 justify-center align-middle">
				<h1 className="text-3xl">Clientes</h1>
				<table className="table-auto border-collapse border border-slate-100 w-full hover:border-collapse">
					<thead>
						<tr className="bg-slate-800 text-white">
							<th className="border border-slate-600">Id</th>
							<th className="border border-slate-600">Cliente</th>
							<th className="border border-slate-600">Fecha de alta</th>
							<th className="border border-slate-600">Ver</th>
						</tr>
					</thead>
					<tbody>
						{clients.map((client) => {
							return (
								<tr key={client.id}>
									<td className="border border-slate-900">
										{client.id}
									</td>
									<td className="border border-slate-900">
										{client.name}
									</td>
									<td className="border border-slate-900">
										{client.fecha_alta}
									</td>
									<td className="border border-slate-900 text-center">
										<Link href={"/Clients/"+client.id}><FontAwesomeIcon icon={faEye} className="text-slate-800 hover:text-cyan-800"/></Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
