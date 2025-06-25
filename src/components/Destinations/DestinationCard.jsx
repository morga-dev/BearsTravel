import Airplane from "../Transports/Airplane";
import Bus from "../Transports/Bus";
import Boat from "../Transports/Boat";
import Train from "../Transports/Train";

const transportIcons = {
  Avión: <Airplane />,
  Autobús: <Bus />,
  Barco: <Boat />,
  Tren: <Train />,
};

// Card para mostrar información de un destino turístico
export default function DestinationCard({ name, image, description, transports, mascot }) {
  return (
    <div className="relative rounded-2xl shadow-xl overflow-hidden border border-[var(--gold)] hover:border-[var(--orange)] transition-colors duration-300 group cursor-pointer
    h-150 w-full">
      {/* Imagen de fondo */}
      <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      {/* Nombre del destino */}
      <div className="absolute top-4 left-4 bg-[var(--gold)] text-[var(--dark-secondary)] px-4 py-1 rounded-full font-bold shadow z-10">
        {name}
      </div>
      {/* Overlay con info, oculto hasta hover */}
      <div className="absolute inset-0 bg-[var(--dark-secondary)] bg-opacity-90 flex flex-col justify-center items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-2xl font-bold text-[var(--gold)] mb-2">{name}</h3>
        <p className="text-[var(--white)] mb-4 text-center">{description}</p>
        <div className="flex gap-4 mt-2">
          {transports.map(t => (
            <span
              key={t}
              title={t}
              className="text-2xl bg-[var(--dark-primary)] rounded-full p-2 shadow hover:bg-[var(--gold)] hover:text-[var(--dark-secondary)] transition"
            >
              {transportIcons[t]}
            </span>
          ))}
        </div>
        {mascot && (
          <img
            src={mascot}
            alt="Mascota Bear"
            className="mascota w-40 h-50 justify-center mx-auto mt-4"
          />
        )}
      </div>
    </div>
  );
}