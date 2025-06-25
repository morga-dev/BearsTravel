import { Navigate } from "react-router-dom";

export default function RedirectIfAuth({ children }) {
  const isLogged = !!localStorage.getItem("token");
  if (isLogged) {
    return <Navigate to="/" replace />;
  }
  return children;
}