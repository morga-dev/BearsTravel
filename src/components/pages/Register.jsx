import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

// Componente de registro
export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("https://bearstravel-api-production.up.railway.app/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("¡Registro exitoso! Redirigiendo...");
        setTimeout(() => navigate("/"), 1000);
      } else {
        setMsg(data.error || "Error al registrarse");
      }
    } catch {
      setMsg("Error de conexión");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--dark-primary)] via-[var(--dark-secondary)] to-[var(--gold)] bg-fixed">
      <div className="backdrop-blur-lg bg-[var(--dark-secondary)]/80 border border-[var(--gold)] rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-[var(--gold)] mb-8 drop-shadow-lg">Registro</h2>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold)]" />
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--dark-primary)] text-white border border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold)]" />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--dark-primary)] text-white border border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gold)]" />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-[var(--dark-primary)] text-white border border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)] transition"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[var(--gold)] to-[var(--orange)] hover:opacity-90 text-[var(--dark-bg)] font-bold py-3 rounded-xl shadow-lg transition-all text-lg"
          >
            Crear cuenta
          </button>
        </form>
        {msg && (
          <div className={`mt-6 text-center text-base font-semibold ${msg.includes("exitoso") ? "text-green-400" : "text-red-400"}`}>
            {msg}
          </div>
        )}
        <p className="text-center text-white font-medium mt-6">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-[var(--gold)] hover:text-[var(--orange)] font-semibold transition">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}