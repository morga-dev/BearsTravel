import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/destinos", label: "Destinos" },
  { to: "/reservas", label: "Reservas" },
  { to: "/mis-reservaciones", label: "Mis reservaciones" }, // <-- agrega esto
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[var(--dark-secondary)] text-[var(--text-secondary)] py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-[var(--gold)] flex items-center gap-2">
          <img src="/Logo.png" alt="Logo" className="w-15 h-full rounded-full opacity-100%" />
          Bear's Travel
        </Link>
        <div className="flex gap-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-[var(--orange)] transition ${
                location.pathname === link.to ? "text-[var(--gold)] font-semibold" : "text-[var(--white)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          {!isLogged ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1 rounded bg-[var(--brown)] text-white hover:bg-[var(--gold)] hover:text-black font-medium transition"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="px-4 py-1 rounded bg-[var(--brown)] text-white hover:bg-[var(--gold)] hover:text-black font-medium transition"
              >
                Registrarse
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded bg-[var(--brown)] text-white hover:bg-[var(--gold)] hover:text-black font-medium transition"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}