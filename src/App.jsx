import React, { useEffect, useState } from "react";
import { Route } from "wouter";

import "./App.css";

import Header from "./components/Header";

import ClientsPage from "./pages/ClientsPage";
import HomePage from "./pages/HomePage";
import SubcriptionsPage from "./pages/SubcriptionsPage";


export default function App() {
	return (
		<>
			<Header />
			<Route path="/" component={HomePage}/>
			<Route path="/clientes" component={ClientsPage}/>
			<Route path="/cuotas" component={SubcriptionsPage}/>
		</>
	);
}
