"use client"

import { DashboardCard } from "@/components/ui/dashboard-card";
import { getCuotasImpagas } from "@/service/supabase/client/Cuotas";
import { useEffect, useState } from "react";

export const CuotasImpagas = () => {
    const [cuotasImpagas, setCuotasImpagas] = useState<string>("0")
    
    useEffect(() => {
        getCuotasImpagasData()
    }, [])
    
    const getCuotasImpagasData = async () => {
        const cuotasImpagasData : any | null = await getCuotasImpagas()
        console.log(cuotasImpagasData);
        
        setCuotasImpagas(cuotasImpagasData!!.count)
    }

	return (
		<DashboardCard
			title="Cuotas impagas"
			data={cuotasImpagas}
		/>
	);
};
