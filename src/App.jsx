import React, { useEffect, useState } from "react";
import { getClientsRequest } from "./services/ClientService";

import "./App.css";

function App() {
	const [clients, setClients] = useState([])

	useEffect(() => {
		getClients()
	}, [])
	
	const getClients = async () => {
		let { data: clientes, error } = await getClientsRequest();
		
		setClients(clientes)
	}

	return (
		<div className="h-full w-full">
			<nav className="bg-slate-800">
				<div>
					<h1 className="text-3xl font-sans  uppercase font-bold text-white h-12">
						Gym Manager
					</h1>
				</div>
			</nav>

			<div className="w-96 p-10 justify-center align-middle">
				<h1 className="text-3xl">Clientes</h1>
				<table className="table-auto border-collapse border border-slate-100 w-full hover:border-collapse">
					<thead>
						<tr className="bg-slate-800 text-white">
							<th className="border border-slate-600">Id</th>
							<th className="border border-slate-600">Cliente</th>
							<th className="border border-slate-600">Fecha de alta</th>
						</tr>
					</thead>
					<tbody>
						{clients.map((cliente) => {
							return (
								<tr key={cliente.id}>
									<td className="border border-slate-900">
										{cliente.id}
									</td>
									<td className="border border-slate-900">
										{cliente.name}
									</td>
									<td className="border border-slate-900">
										{cliente.fecha_alta}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
