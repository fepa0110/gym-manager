import React from "react";
import Link from "next/link";


export default function Header() {
	return (
		<>
			<header className="bg-slate-800 py-4">
				<div className="container flex justify-between items-center">
					<Link
						href="/"
						className="text-3xl font-sans uppercase font-semibold text-white hover:text-orange-500">
						Gym Manager
					</Link>
					<nav className="">
						<ul className="flex space-x-4 text-white">
							<li>
								<Link href="/Clients" className="hover:text-slate-600">
									Clientes
								</Link>
							</li>
							<li>
								<Link href="/Subscriptions" className="hover:text-slate-600">
									Cuotas
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
}
