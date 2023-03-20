import React, { useEffect, useState } from "react";
import { getClientsRequest } from "./services/ClientService";

import "./App.css";

import Header from "./components/Header";

import ClientsPage from "./screens/ClientsPage"; './screens/ClientsScreen'

export default function App() {
	return (
		<>
			<Header/>
			<ClientsPage/>
		</>
	);
}