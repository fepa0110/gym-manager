"use client";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export const VolverButton = () => {
	const router = useRouter();

	return (
		<button
			onClick={() => router.back()}
			className="flex flex-row w-28 px-3 py-2 justify-between items-center border border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-100 hover:scale-105">
			<FontAwesomeIcon icon={faArrowLeft} size="lg" />
			<span>Volver</span>
		</button>
	);
};
