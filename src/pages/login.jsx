import Layout from "@/components/Layout";
import { loginWithEmail } from "@/services/LoginService";
import React, { useRef } from "react";

export default function Login() {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const  sendLogin = async () => {
		emailRef.current.focus();
		passwordRef.current.focus();
		console.log("email: "+emailRef.current.value);
		console.log("password: "+passwordRef.current.value);

		let { data, error } = await loginWithEmail(emailRef.current.value,passwordRef.current.value);
		console.log("data"+JSON.stringify(data, null, 3));
	};

	return (
		<Layout>
			<div className="flex flex-col h-screen bg-[url('../assets/gym.webp')] bg-cover">
				<div className="flex items-center justify-center flex-1">
					<div className="w-full max-w-md px-4 py-8 bg-transparent backdrop-blur-md shadow-md rounded-lg">
						<h2 className="mb-4 text-2xl font-bold text-center text-slate-800">
							Login
						</h2>
						<form onSubmit={handleLogin}>
							<div className="mb-4">
								<label
									className="block mb-2 text-sm font-bold text-slate-800"
									htmlFor="username">
									Username
								</label>
								<input
									className="form-input w-full border-2 border-black rounded-md text-black bg-white"
									type="text"
									id="username"
									name="username"
									ref={emailRef}
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className="block mb-2 text-sm font-bold text-slate-800"
									htmlFor="password">
									Password
								</label>
								<input
									className="form-input w-full border-2 border-black rounded-md text-black bg-white"
									type="password"
									id="password"
									name="password"
									ref={passwordRef}
									required
								/>
							</div>
							<div className="my-4">
								<button
									className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded"
									type="submit">
									Sign In
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	);
}
