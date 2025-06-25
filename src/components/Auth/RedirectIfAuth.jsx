import { Navigate } from "react-router-dom";

// Componente que redirige a la página principal si el usuario ya está autenticado
export default function RedirectIfAuth({ children }) {
  const isLogged = !!localStorage.getItem("token");
  if (isLogged) {
    return <Navigate to="/" replace />;
  }
  return children;
}