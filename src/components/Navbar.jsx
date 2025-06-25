import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/destinos", label: "Destinos" },
  { to: "/reservas", label: "Reservas" },
  { to: "/mis-reservaciones", label: "Mis reservaciones" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogged = !!localStorage.getItem("token");
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[var(--dark-secondary)] text-[var(--text-secondary)] py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold text-[var(--gold)] flex items-center gap-2">
          <img src="/Logo.png" alt="Logo" className="w-12 h-12 rounded-full" />
          Bear's Travel
        </Link>
        {/* Desktop links */}
        <div className="hidden md:flex gap-6">
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
        {/* Auth buttons */}
        <div className="hidden md:flex gap-4">
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
        {/* Mobile menu button */}
        <button
          className="md:hidden text-[var(--gold)]"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--dark-secondary)] px-4 pb-4">
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-[var(--orange)] transition ${
                  location.pathname === link.to ? "text-[var(--gold)] font-semibold" : "text-[var(--white)]"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!isLogged ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 rounded bg-[var(--brown)] text-white hover:bg-[var(--gold)] hover:text-black font-medium transition"
                  onClick={() => setOpen(false)}
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/registro"
                  className="px-4 py-1 rounded bg-[var(--brown)] text-white hover:bg-[var(--gold)] hover:text-black font-medium transition"
                  onClick={() => setOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="px-4 py-1 rounded bg-[var(--brown)] text-white hover:bg-[var(--gold)] hover:text-black font-medium transition"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}