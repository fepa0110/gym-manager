import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Kumbh_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import "toastify-js/src/toastify.css"

import Header from "@/components/header";
import Footer from "@/components/footer";

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:3000";

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: "Gym Manager",
	description: "Sistema de gestion de cuotas y rutinas de clientes",
};

const kumbhSans = Kumbh_Sans({
	display: "swap",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={kumbhSans.className} suppressHydrationWarning>
			<body className="bg-background text-foreground">
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange>
					<main className="min-h-screen flex flex-col items-center">
						<div className="flex-1 w-full flex flex-col gap-6 items-center">
							<Header />

							<div className="flex flex-col gap-3 w-3/4 py-5">
								{children}
							</div>

							{/* <Footer /> */}
						</div>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
