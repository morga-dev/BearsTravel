import SplitText from "../Bits/SplitText";

const hotels = [
  {
    city: "Cancún",
    items: [
      {
        name: "Hotel Fiesta Americana Condesa Cancún",
        image: "/H1.jpg",
        description: "Resort todo incluido frente al mar, ideal para familias y parejas. Piscinas, restaurantes y actividades.",
        stars: 5,
      },
      {
        name: "Krystal Cancún",
        image: "/H2.jpg",
        description: "Ubicación privilegiada en la Zona Hotelera, con acceso directo a la playa y excelente vida nocturna.",
        stars: 4,
      },
      {
        name: "Grand Oasis Palm",
        image: "/H3.jpg",
        description: "Perfecto para familias, con club infantil, albercas y restaurantes temáticos.",
        stars: 4,
      },
    ],
  },
  {
    city: "Los Cabos",
    items: [
      {
        name: "Hotel Riu Palace Cabo San Lucas",
        image: "/H4.jpg",
        description: "Resort de lujo todo incluido, con vistas al mar, spa y múltiples restaurantes.",
        stars: 5,
      },
      {
        name: "Marina Fiesta Resort & Spa",
        image: "/H5.jpg",
        description: "Ubicado en la marina de Cabo San Lucas, cerca de tiendas y vida nocturna.",
        stars: 4,
      },
      {
        name: "Solmar Resort",
        image: "/H6.jpg",
        description: "Ambiente relajado, ideal para descansar y disfrutar de la playa.",
        stars: 4,
      },
    ],
  },
];

function StarRating({ stars }) {
  return (
    <span className="text-yellow-400">
      {"★".repeat(stars)}
      {"☆".repeat(5 - stars)}
    </span>
  );
}

export default function Hotels() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <SplitText
        text="Hoteles Disponibles"
        className="text-4xl font-extrabold text-center text-[var(--gold)] mb-12 drop-shadow-lg"
        splitType="chars"
        delay={40}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {hotels.map(city => (
          <div key={city.city}>
            <h3 className="text-2xl font-bold text-[var(--gold)] mb-6 text-center">{city.city}</h3>
            <div className="flex flex-col gap-8">
              {city.items.map(hotel => (
                <div
                  key={hotel.name}
                  className="bg-[var(--dark-secondary)] rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row items-center gap-6 border border-[var(--gold)] transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:border-[var(--orange)]"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full sm:w-40 h-32 object-cover rounded-xl shadow"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-1">{hotel.name}</h4>
                    <StarRating stars={hotel.stars} />
                    <p className="text-gray-300 mt-2">{hotel.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}