import Header from "@/components/Header";
import React from "react";
import login from "./login";
import Layout from "@/components/Layout";

export default function HomePage() {
	const isLogin = true;

	return (
		<Layout>
			<div className="flex flex-col h-screen items-stretch bg-[url('../assets/gym.webp')] bg-cover">
				<div className="flex flex-1 items-center justify-center">
					<h1 className="w-screen text-center text-6xl bg-transparent backdrop-blur-md text-black font-bold">Bienvenido</h1>
				</div>
			</div>
		</Layout>
	);
}
