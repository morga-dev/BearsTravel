import { useState } from "react";
import { Plane, Bus, Ship, Train, Search, Loader2, Clock, MapPin, Star, Zap, XCircle, CheckCircle, User } from "lucide-react";
import SplitText from "../Bits/SplitText";

// Opciones de transporte
const transportOptions = [
  { value: "all", label: "Todos los transportes", icon: <Search className="h-4 w-4" /> },
  { value: "avión", label: "Avión", icon: <Plane className="h-4 w-4 text-brand-blue" /> },
  { value: "autobús", label: "Autobús", icon: <Bus className="h-4 w-4 text-brand-green" /> },
  { value: "crucero", label: "Crucero", icon: <Ship className="h-4 w-4 text-brand-purple" /> },
  { value: "tren", label: "Tren", icon: <Train className="h-4 w-4 text-brand-orange" /> },
];

// Resultados simulados
const MOCK_RESULTS = [
  {
    id: 1,
    transport: "Avión",
    route: ["CDMX", "Cancún"],
    duration: "2h 10m",
    price: 3999,
    departure: "08:00",
    arrival: "10:10",
    stops: [],
  },
  {
    id: 2,
    transport: "Autobús",
    route: ["CDMX", "Los Cabos"],
    duration: "24h",
    price: 2499,
    departure: "20:00",
    arrival: "20:00 (+1 día)",
    stops: ["Guadalajara", "La Paz"],
  },
  {
    id: 3,
    transport: "Tren (Ferri)",
    route: ["CDMX", "La Paz", "Los Cabos"],
    duration: "30h",
    price: 2999,
    departure: "18:00",
    arrival: "00:00 (+2 días)",
    stops: ["Guadalajara", "Mazatlán"],
  },
];

export default function Reservation() {
  // Estado del formulario
  const [destination, setDestination] = useState("");
  const [transport, setTransport] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  // Modal: pasos y datos
  const [step, setStep] = useState(1); // 1: formulario, 2: resumen, 3: éxito
  const [reservationSuccess, setReservationSuccess] = useState(false);

  // Datos de pasajeros
  const initialPassenger = { nombres: "", apellidos: "", edad: "", email: "", telefono: "" };
  const [passengerData, setPassengerData] = useState([ { ...initialPassenger } ]);

  // Simula búsqueda de viajes
  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      let filtered = MOCK_RESULTS.filter(
        r =>
          (!destination || r.route.includes(destination)) &&
          (!transport || transport === "all" || r.transport.toLowerCase().includes(transport))
      );
      setResults(filtered);
      setIsSearching(false);
    }, 1000);
  };

  // Helpers para íconos y colores
  const getTransportIcon = (transport) => {
    switch (transport.toLowerCase()) {
      case "avión":
        return <Plane className="h-5 w-5" />;
      case "autobús":
        return <Bus className="h-5 w-5" />;
      case "crucero":
        return <Ship className="h-5 w-5" />;
      case "tren":
      case "tren (ferri)":
        return <Train className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getTransportColor = (transport) => {
    switch (transport.toLowerCase()) {
      case "avión":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30";
      case "autobús":
        return "bg-green-500/20 text-green-500 border-green-500/30";
      case "crucero":
        return "bg-purple-500/20 text-purple-500 border-purple-500/30";
      case "tren":
      case "tren (ferri)":
        return "bg-orange-500/20 text-orange-500 border-orange-500/30";
      default:
        return "bg-gray-700/50 text-gray-300 border-gray-600";
    }
  };

  // Abrir modal y preparar datos de pasajeros
  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
    setModalOpen(true);
    setStep(1);
    setReservationSuccess(false);
    // Inicializa los datos de pasajeros según el número seleccionado
    setPassengerData(Array.from({ length: passengers }, () => ({ ...initialPassenger })));
  };

  // Maneja cambios en los campos de pasajeros
  const handlePassengerChange = (idx, field, value) => {
    setPassengerData(prev => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };

  // Validación sencilla
  const isPassengerFormValid = passengerData.every(
    p =>
      p.nombres.trim() &&
      p.apellidos.trim() &&
      p.edad &&
      (!p.email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) &&
      (!p.telefono || /^[0-9+\s()-]{7,}$/.test(p.telefono))
  );

  // Enviar formulario de pasajeros
  const handlePassengerSubmit = (e) => {
    e.preventDefault();
    if (!isPassengerFormValid) return;
    setStep(2);
  };

  // Confirmar reserva
  const handleConfirmReservation = () => {
    // Construye el objeto de reservación
    const reservation = {
      viaje: selectedTrip,
      pasajeros: passengerData,
      cantidad: passengers,
      fechaReserva: new Date().toISOString(),
    };
    // Obtiene las reservaciones previas y agrega la nueva
    const prev = JSON.parse(localStorage.getItem("reservations") || "[]");
    localStorage.setItem("reservations", JSON.stringify([...prev, reservation]));

    setStep(3);
    setReservationSuccess(true);
    setTimeout(() => {
      setModalOpen(false);
      setSelectedTrip(null);
      setStep(1);
    }, 2000);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <SplitText
        text="Reservaciones de Viaje"
        className="text-4xl font-extrabold text-center text-[var(--gold)] mb-12 drop-shadow-lg"
        splitType="chars"
        delay={40}
      />

      {/* Formulario de búsqueda */}
      <form
        onSubmit={handleSearch}
        className="bg-[var(--dark-secondary)]/90 backdrop-blur-xl border border-gray-700/50 shadow-2xl rounded-2xl p-8 mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Destino */}
          <div>
            <label className="block text-white font-semibold mb-2">Destino</label>
            <select
              value={destination}
              onChange={e => setDestination(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[var(--dark-primary)] text-white border border-gray-600 focus:border-[var(--gold)]"
              required
            >
              <option value="">Selecciona destino</option>
              <option value="Los Cabos">Los Cabos</option>
              <option value="Cancún">Cancún</option>
            </select>
          </div>
          {/* Transporte */}
          <div>
            <label className="block text-white font-semibold mb-2">Transporte</label>
            <select
              value={transport}
              onChange={e => setTransport(e.target.value)}
              className="w-full px-4 py-2 rounded bg-[var(--dark-primary)] text-white border border-gray-600 focus:border-[var(--gold)]"
              required
            >
              <option value="">Tipo de transporte</option>
              {transportOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {/* Fecha de salida */}
          <div>
            <label className="block text-white font-semibold mb-2">Fecha de Salida</label>
            <input
              type="date"
              value={departureDate}
              onChange={e => setDepartureDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 rounded bg-[var(--dark-primary)] text-white border border-gray-600 focus:border-[var(--gold)]"
              required
            />
          </div>
          {/* Fecha de regreso */}
          <div>
            <label className="block text-white font-semibold mb-2">Fecha de Regreso</label>
            <input
              type="date"
              value={returnDate}
              onChange={e => setReturnDate(e.target.value)}
              min={departureDate || new Date().toISOString().split("T")[0]}
              className="w-full px-4 py-2 rounded bg-[var(--dark-primary)] text-white border border-gray-600 focus:border-[var(--gold)]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          {/* Pasajeros */}
          <div>
            <label className="block text-white font-semibold mb-2">Pasajeros</label>
            <select
              value={passengers}
              onChange={e => setPassengers(Number(e.target.value))}
              className="w-full px-4 py-2 rounded bg-[var(--dark-primary)] text-white border border-gray-600 focus:border-[var(--gold)]"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? "Pasajero" : "Pasajeros"}
                </option>
              ))}
            </select>
          </div>
          {/* Botón buscar */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--gold)] to-[var(--orange)] text-white font-bold h-12 rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
              disabled={isSearching || !destination || !transport || !departureDate}
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-5 w-5" />
                  Buscar Viajes
                </>
              )}
            </button>
          </div>
        </div>
        {/* Mensaje especial para tren */}
        {transport === "tren" && destination === "Los Cabos" && (
          <div className="bg-orange-500/20 border border-orange-500/30 rounded-xl p-6 mt-6 animate-slide-up">
            <div className="flex items-start space-x-3">
              <div className="bg-orange-500/20 p-2 rounded-lg">
                <Train className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-orange-500 font-semibold mb-1">Ruta Especial - Tren + Ferri</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Para llegar a Los Cabos en tren, el viaje incluye una parada en La Paz donde tomarás el ferri hacia Los Cabos. Una experiencia única que combina tierra y mar.
                </p>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Resultados */}
      {results.length > 0 && (
        <div className="mt-16 animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Resultados de Búsqueda ({results.length})
            </h3>
            <div className="flex items-center space-x-2 text-green-500">
              <Zap className="h-5 w-5" />
              <span className="font-semibold">Resultados instantáneos</span>
            </div>
          </div>
          <div className="space-y-6">
            {results.map((result, index) => (
              <div
                key={result.id}
                className={`bg-[var(--dark-secondary)]/90 backdrop-blur-xl border border-gray-700/50 hover:border-gray-600/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] rounded-2xl p-8 animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <span className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border rounded-full ${getTransportColor(result.transport)}`}>
                        {getTransportIcon(result.transport)}
                        {result.transport}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm bg-[var(--dark-primary)]/50 px-3 py-1 rounded-full">
                        <Clock className="h-4 w-4 mr-2" />
                        {result.duration}
                      </div>
                      <div className="flex items-center text-green-500 text-sm">
                        <Star className="h-4 w-4 mr-1 fill-current" />
                        <span className="font-semibold">4.8</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-[var(--gold)] to-[var(--orange)] p-2 rounded-lg">
                          <MapPin className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white font-semibold text-lg">{result.route.join(" → ")}</span>
                      </div>
                      {result.stops && result.stops.length > 0 && (
                        <div className="text-sm text-gray-400 ml-11 bg-[var(--dark-primary)]/30 px-4 py-2 rounded-lg">
                          <span className="text-orange-500 font-semibold">Escalas:</span> {result.stops.join(", ")}
                        </div>
                      )}
                      <div className="flex items-center gap-6 text-sm text-gray-300 ml-11">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>
                            <strong>Salida:</strong> {result.departure}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <span>
                            <strong>Llegada:</strong> {result.arrival}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col lg:items-end gap-4 lg:min-w-[200px]">
                    <div className="text-right">
                      <div className="text-3xl font-black bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                        ${result.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400 font-medium">MXN por persona</div>
                    </div>
                    <button
                      className="bg-gradient-to-r from-[var(--gold)] to-[var(--orange)] hover:opacity-90 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 w-full lg:w-auto"
                      onClick={() => handleSelectTrip(result)}
                    >
                      Seleccionar Viaje
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de formulario y resumen */}
      {modalOpen && selectedTrip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[var(--dark-secondary)] rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar"
            >
              <XCircle className="w-7 h-7" />
            </button>
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold text-[var(--gold)] mb-4 text-center">Datos del Pasajero{passengers > 1 && "s"}</h2>
                <form onSubmit={handlePassengerSubmit} className="space-y-6">
                  {passengerData.map((p, idx) => (
                    <div key={idx} className="bg-[var(--dark-primary)] rounded-xl p-4 mb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="text-[var(--gold)]" />
                        <span className="font-semibold text-white">
                          {idx === 0 ? "Titular" : `Acompañante ${idx + 1}`}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Nombres"
                          className="px-3 py-2 rounded bg-[var(--dark-secondary)] text-white border border-[var(--gold)] focus:outline-none"
                          value={p.nombres}
                          onChange={e => handlePassengerChange(idx, "nombres", e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Apellidos"
                          className="px-3 py-2 rounded bg-[var(--dark-secondary)] text-white border border-[var(--gold)] focus:outline-none"
                          value={p.apellidos}
                          onChange={e => handlePassengerChange(idx, "apellidos", e.target.value)}
                          required
                        />
                        <input
                          type="number"
                          placeholder="Edad"
                          min={0}
                          className="px-3 py-2 rounded bg-[var(--dark-secondary)] text-white border border-[var(--gold)] focus:outline-none"
                          value={p.edad}
                          onChange={e => handlePassengerChange(idx, "edad", e.target.value)}
                          required
                        />
                        {idx === 0 && (
                          <>
                            <input
                              type="email"
                              placeholder="Correo electrónico"
                              className="px-3 py-2 rounded bg-[var(--dark-secondary)] text-white border border-[var(--gold)] focus:outline-none"
                              value={p.email}
                              onChange={e => handlePassengerChange(idx, "email", e.target.value)}
                              required={idx === 0}
                            />
                            <input
                              type="tel"
                              placeholder="Teléfono"
                              className="px-3 py-2 rounded bg-[var(--dark-secondary)] text-white border border-[var(--gold)] focus:outline-none"
                              value={p.telefono}
                              onChange={e => handlePassengerChange(idx, "telefono", e.target.value)}
                              required={idx === 0}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[var(--gold)] to-[var(--orange)] text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition-all mt-2"
                    disabled={!isPassengerFormValid}
                  >
                    Continuar
                  </button>
                </form>
              </>
            )}
            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold text-[var(--gold)] mb-4 text-center">Resumen de la Reserva</h2>
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border rounded-full ${getTransportColor(selectedTrip.transport)}`}>
                      {getTransportIcon(selectedTrip.transport)}
                      {selectedTrip.transport}
                    </span>
                    <span className="text-white font-semibold text-lg">{selectedTrip.route.join(" → ")}</span>
                  </div>
                  <div className="text-gray-300 text-sm">
                    <div><strong>Salida:</strong> {selectedTrip.departure} | <strong>Llegada:</strong> {selectedTrip.arrival}</div>
                    <div><strong>Duración:</strong> {selectedTrip.duration}</div>
                    <div><strong>Precio total:</strong> <span className="text-[var(--gold)] font-bold">${(selectedTrip.price * passengers).toLocaleString()} MXN</span></div>
                    <div><strong>Pasajeros:</strong> {passengers}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[var(--gold)] mb-2">Datos de los pasajeros</h3>
                  <ul className="space-y-2">
                    {passengerData.map((p, idx) => (
                      <li key={idx} className="bg-[var(--dark-primary)] rounded-lg p-3 text-white text-sm">
                        <span className="font-semibold">{idx === 0 ? "Titular" : `Acompañante ${idx + 1}`}: </span>
                        {p.nombres} {p.apellidos}, {p.edad} años
                        {idx === 0 && (
                          <>
                            <br />
                            <span className="text-gray-400">Email: {p.email} | Tel: {p.telefono}</span>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-[var(--gold)] to-[var(--orange)] text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition-all mt-2"
                  onClick={handleConfirmReservation}
                >
                  Confirmar Reserva
                </button>
              </>
            )}
            {step === 3 && (
              <div className="flex flex-col items-center justify-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <div className="text-xl font-bold text-green-500 mb-2">¡Reserva exitosa!</div>
                <div className="text-gray-300 text-center">Tu viaje ha sido reservado.<br />Pronto recibirás un correo de confirmación.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mensaje final */}
      <div className="mt-12 text-center">
        <span className="inline-block bg-[var(--gold)] text-[var(--dark-secondary)] px-8 py-3 rounded-full font-semibold shadow-lg text-lg">
          ¡Reserva tu viaje y vive la mejor experiencia con Bear's Travel!
        </span>
      </div>
    </section>
  );
}