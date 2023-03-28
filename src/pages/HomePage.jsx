import Header from "@/components/Header";
import React from "react";

export default function HomePage() {
	return (
		<div className="flex flex-col h-screen items-stretch bg-[url('../assets/gym.webp')] bg-cover">
			<Header />
			<div className="w-1/4 self-center mt-20 px-10 py-5 rounded-lg backdrop-blur-lg shadow-lg">
				<h1 className="mb-5 text-3xl text-center text-slate-800 font-bold">
					Login
				</h1>

				<form className="flex flex-col items-center w-auto">
					<div className="mb-2 border-2 w-26">
						<label className="text-slate-800 font-bold">Username</label>
						<input
							type="text"
							name="username"
							className="border-2 border-black w-auto hover:border-cyan-600 my-2 text-black bg-white rounded-lg"
							id="username"
						/>
					</div>

					<div>
						<label className="text-slate-800 font-bold">Contraseña</label>
						<input
							type="password"
							name="password"
							id="password"
							className="border-2 border-black hover:border-cyan-600 my-2 text-black bg-white rounded-lg"
						/>
					</div>

					<button className="border-2 border-cyan-600 text-white bg-cyan-600 hover:text-cyan-600 hover:bg-transparent self-center text-center font-bold rounded-md w-32 my-5 py-1">
						Login
					</button>
				</form>
			</div>
		</div>
	);
}
