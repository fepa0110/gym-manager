import React from "react";

const Header = () => {
	return (
		<>
			<header className="bg-slate-800 py-4">
				<div className="container flex justify-between items-center">
					<a className="text-3xl font-sans uppercase font-semibold text-white">
						Gym Manager
					</a>
					<nav className="">
						<ul className="flex space-x-4 text-white">
							<li>
								<a className="hover:text-slate-600" href="#">
									Clientes
								</a>
							</li>
							<li>
								<a className="hover:text-slate-600" href="#">
									Cuotas
								</a>
							</li>
							<li>
								<a className="hover:text-slate-600" href="#">
									Salir
								</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		</>
	);
};

export default Header;
