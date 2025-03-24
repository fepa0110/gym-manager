"use client";

import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	function switchTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}

	return (
		<button className="mx-3" onClick={switchTheme}>
			{theme === "light" ? (
				<FontAwesomeIcon
					key="light"
					icon={faSun}
					size="xl"
					className={
						"text-muted-foreground transition-all hover:scale-110 hover:text-yellow-600"
					}
				/>
			) : (
				<FontAwesomeIcon
					key="dark"
					icon={faMoon}
					size="xl"
					className={
						"text-muted-foreground transition-all hover:scale-110 hover:text-blue-600"
					}
				/>
			)}
		</button>
	);
};

export { ThemeSwitcher };
