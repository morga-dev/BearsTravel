import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <footer
      className={`bg-[var(--dark-secondary)] text-[var(--text-secondary)] py-6 mt-8 ${
        isHome ? "opacity-80" : ""
      }`}
    >
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} Bear's Travel. Todos los derechos reservados.
      </div>
    </footer>
  );
}