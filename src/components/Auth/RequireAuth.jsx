import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const isLogged = !!localStorage.getItem("token");

  if (!isLogged) {
    // Si no está logueado, redirige a /login y recuerda la ruta original
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}