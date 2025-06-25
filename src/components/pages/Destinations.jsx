import DestinationCard from "../Destinations/DestinationCard";
import SplitText from "../Bits/SplitText";

const destinations = [
	{
		name: "Los Cabos",
		image: "/LosCabos.jpg",
		description:
			"Un paraíso en Baja California Sur, destino turístico reconocido por sus impresionantes paisajes, playas vírgenes, hoteles de lujo y una amplia gama de actividades. Ofrece experiencias para parejas, familias y grupos de amigos, con opciones que van desde relajarse en la playa hasta aventuras emocionantes. ",
		transports: ["Avión", "Autobús", "Barco", "Tren"],
		mascot: "/BearCabos.png",
	},
	{
		name: "Cancún",
		image: "/Cancun.jpg",
		description:
			"Destino turístico de clase mundial en el Caribe mexicano, conocido por sus playas de arena blanca, aguas turquesa y vibrante vida nocturna. Además de sus atractivos naturales, ofrece una amplia gama de actividades culturales, aventuras y relajación para todo tipo de viajeros. ",
		transports: ["Avión", "Autobús", "Tren"],
		mascot: "/BearCancun.png",
	},
];

export default function Destinations() {
	return (
		<section className="max-w-6xl mx-auto px-4 py-10">
			<SplitText
				text="Destinos"
				className="text-4xl font-extrabold text-center text-[var(--gold)] mb-12 drop-shadow-lg"
				splitType="chars"
				delay={40}
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
				{destinations.map((dest) => (
					<div
						key={dest.name}
						className="transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
					>
						<DestinationCard {...dest} />
					</div>
				))}
			</div>
			<div className="mt-12 text-center">
				<span className="inline-block bg-[var(--gold)] text-[var(--dark-secondary)] px-6 py-2 rounded-full font-semibold shadow-lg">
					¡Descubre tu próximo destino con Bear's Travel!
				</span>
			</div>
		</section>
	);
}