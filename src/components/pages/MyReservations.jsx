import { useEffect, useState } from "react";
import { Calendar, MapPin, User, Trash2 } from "lucide-react";
import SplitText from "../Bits/SplitText";

export default function MyReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reservations") || "[]");
    setReservations(stored);
  }, []);

  const handleDelete = idx => {
    const updated = reservations.filter((_, i) => i !== idx);
    setReservations(updated);
    localStorage.setItem("reservations", JSON.stringify(updated));
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <SplitText
        text="Mis Reservaciones"
        className="text-4xl font-extrabold text-center text-[var(--gold)] mb-12 drop-shadow-lg"
        splitType="chars"
        delay={40}
      />
      {reservations.length === 0 ? (
        <div className="text-center text-gray-400 text-lg mt-12">
          No tienes reservaciones aún.
        </div>
      ) : (
        <div className="space-y-8">
          {reservations.map((res, idx) => (
            <div
              key={idx}
              className="bg-[var(--dark-secondary)] rounded-xl shadow-lg p-6 border border-[var(--gold)] relative"
            >
              <button
                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
                onClick={() => handleDelete(idx)}
                title="Eliminar reservación"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="text-[var(--gold)]" />
                <span className="font-bold text-lg text-white">
                  {res.viaje.route.join(" → ")}
                </span>
                <span className="ml-2 px-3 py-1 rounded-full bg-[var(--gold)] text-[var(--dark-secondary)] text-xs font-semibold">
                  {res.viaje.transport}
                </span>
              </div>
              <div className="text-gray-300 text-sm mb-2">
                <Calendar className="inline-block w-4 h-4 mr-1" />
                Reservado el {new Date(res.fechaReserva).toLocaleString()}
              </div>
              <div className="text-gray-300 text-sm mb-2">
                <strong>Salida:</strong> {res.viaje.departure} | <strong>Llegada:</strong> {res.viaje.arrival}
              </div>
              <div className="text-gray-300 text-sm mb-2">
                <strong>Duración:</strong> {res.viaje.duration} | <strong>Pasajeros:</strong> {res.cantidad}
              </div>
              <div className="mt-2">
                <h4 className="text-[var(--gold)] font-semibold mb-1">Pasajeros:</h4>
                <ul className="space-y-1">
                  {res.pasajeros.map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-white text-sm">
                      <User className="w-4 h-4 text-[var(--gold)]" />
                      {p.nombres} {p.apellidos}, {p.edad} años
                      {i === 0 && (
                        <span className="ml-2 text-gray-400">
                          ({p.email} / {p.telefono})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 text-right text-lg font-bold text-[var(--gold)]">
                Total: ${(res.viaje.price * res.cantidad).toLocaleString()} MXN
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}