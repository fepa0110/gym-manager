import React from "react";
import { Link } from "wouter";

const Header = () => {
	return (
		<>
			<header className="bg-slate-800 py-4">
				<div className="container flex justify-between items-center">
					<Link href="/" className="text-3xl font-sans uppercase font-semibold text-white hover:text-orange-500">
						Gym Manager
					</Link>
					<nav className="">
						<ul className="flex space-x-4 text-white">
							<li>
								<Link href="/clientes" className="hover:text-slate-600">
									Clientes
								</Link>
							</li>
							<li>
								<Link href="/cuotas" className="hover:text-slate-600">
									Cuotas
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
