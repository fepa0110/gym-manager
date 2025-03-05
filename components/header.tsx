import Link from "next/link";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { EnvVarWarning } from "./env-var-warning";
import HeaderAuth from "./header-auth";
import { ThemeSwitcher } from "./theme-switcher";


export default function Header() {
	return (
		<nav className="w-full flex flex-col justify-center items-center border-0 border-b-primary/20 h-16 gap-2">
			<div className="w-3/4 max-w-full flex justify-between items-center px-5 text-sm">
				<div className="flex gap-5 items-center ">
					<Link href={"/"} className="font-semibold text-primary text-lg hover:scale-105 transition-all">GymManager</Link>
					<div className="flex items-center gap-2">
						
					</div>
				</div>
                <div className="flex flex-row gap-2">
                    <ThemeSwitcher />
                    {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
                </div>
			</div>
			<div className="w-full p-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
		</nav>
	);
}
