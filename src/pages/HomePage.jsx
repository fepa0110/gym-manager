import Header from "@/components/Header";
import React from "react";

export default function HomePage() {
	return (
		<div className="flex flex-col h-screen items-stretch bg-[url('../assets/gym.webp')] bg-cover">
			<Header />
		</div>
	);
}
