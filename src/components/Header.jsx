import React from "react";
import Link from "next/link";

export default function Header() {
	return (
		<>
			<header className="bg-slate-800 py-4 w-screen justfy-self-center">
				<div className="flex flex-col sm:flex-row mx-4 justify-between items-center">
					<Link
						href="/"
						className="text-3xl font-sans uppercase font-semibold text-white hover:text-cyan-800">
						Gym Manager
					</Link>
					<nav className="">
						<ul className="flex space-x-4 lg:pt-0 md:pt-0 xs:pt-5 text-white">
							<li>
								<Link href="/Clients" className="hover:text-slate-600">
									Clientes
								</Link>
							</li>
							<li>
								<Link
									href="/Subscriptions"
									className="hover:text-slate-600">
									Cuotas
								</Link>
							</li>
							<li>
								<Link href="/login" className="block border border-white hover:bg-cyan-800 px-4 rounded-md">Sign in</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
}
