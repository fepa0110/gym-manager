import React from "react";

import "./App.css";

function App() {
	const clientes = [
		{
			id: 1,
			nombre: "Kyler",
			cuota: "$60589",
		},
		{
			id: 2,
			nombre: "Adell",
			cuota: "$96499",
		},
		{
			id: 3,
			nombre: "Libby",
			cuota: "$33228",
		},
	];

	return (
		<div className="h-full w-full">
			<nav className="bg-slate-800">
				<div>
					<h1 className="text-3xl font-sans  uppercase font-bold text-white h-12">Gym Manager</h1>
				</div>
			</nav>

      <div className="w-96 p-10">
        <h1 className="text-3xl">Clientes</h1>
        <table className="table-auto border-collapse border border-slate-100 w-full hover:border-collapse">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="border border-slate-600">Id</th>
              <th className="border border-slate-600">Cliente</th>
              <th className="border border-slate-600">Cuota</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente)=>{
              return(
              <tr key={cliente.id}>
                <td className="border border-slate-900">{cliente.id}</td>
                <td className="border border-slate-900">{cliente.nombre}</td>
                <td className="border border-slate-900">{cliente.cuota}</td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
		</div>
	);
}

export default App;
