"use client";

import { DashboardCard } from "@/components/ui/dashboard-card";
import { getCuotasImpagas } from "@/service/supabase/client/Cuotas";
import { useEffect, useState } from "react";

export const CuotasImpagas = () => {
	const [cuotasImpagas, setCuotasImpagas] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		getCuotasImpagasData();
	}, []);

	const getCuotasImpagasData = async () => {
		setIsLoading(true);

		const cuotasImpagas = await getCuotasImpagas();

		if (cuotasImpagas != null) {
			setCuotasImpagas(cuotasImpagas);
		}

		setIsLoading(false);
	}

	return (
		<DashboardCard title="Cuotas impagas" data={cuotasImpagas} />
	);
};
