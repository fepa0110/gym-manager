import Header from "@/components/Header";
import { getClientByIdRequest } from "@/services/ClientService";
import { getSubscriptionsByClientRequest } from "@/services/SubscriptionService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Clients = ({ data }) => {
	const router = useRouter();
	const { id } = router.query;
	const client = data[0].cliente;
	// const [client, setClient ] = useState({});
	// const [subscriptions, setSubscriptions] = useState([]);

	useEffect(() => {
		console.log(
			"🚀 ~ file: [id].jsx:8 ~ Clients ~ data:",
			data
		);
	}, [data]);

	const getSubscriptionsByClient = async (clientId) => {
		const { data: subscription } = await getSubscriptionsByClientRequest(
			clientId
		);
		// setSubscriptions(subscription);
	};

	return (
		<>
			<Header />
			<h1 className="text-3xl">{"Cliente " + client.id}</h1>
			<h3 className="text-xl">{"Nombre: " + client.name}</h3>
			<h3 className="text-xl">{"Fecha de alta: " + client.fecha_alta}</h3>
			
			<h2 className="text-2xl">Cuotas</h2>
			{data.map((subcription)=>{
				return(
					<div className="bg-blue-600 text-white px-2 m-1 w-1/4 rounded-lg" key={subcription.id}>
						<h3 className="text-xl">{"$"+subcription.cuota.precio_mensual}</h3>
						<h3 className="text-xl">{"Fecha: "+subcription.fecha_cuota}</h3>
						<h3 className="text-xl">{"Paga:"+subcription.paga}</h3>
					</div>
				)
			})}
			<h3 className="text-xl">{}</h3>
		</>
	);
};

export default Clients;

export async function getServerSideProps(context) {
	const { id } = context.query;
	// const { data: data } = await getClientByIdRequest(id);

	// Harcoded data
	// const data = [{id: 2, name: "Pepe", fecha_alta: "2023-03-19"}];

	const { data: data } = await getSubscriptionsByClientRequest(id);

	return { props: { data } };
}
