import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/pages/Home";
import Destinations from "./components/pages/Destinations";
import Reservation from "./components/pages/Reservation";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import RequireAuth from "./components/Auth/RequireAuth";
import MyReservations from "./components/pages/MyReservations";
import RedirectIfAuth from "./components/Auth/RedirectIfAuth";

function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div
        className={
          isHome
            ? "flex-1 flex flex-col"
            : "flex-1 flex flex-col bg-[var(--dark-primary)]"
        }
        style={
          isHome
            ? {
                backgroundImage: "url('/Header.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: "var(--dark-primary)",
              }
            : {}
        }
      >
        <main className="flex-1 px-4 py-8 bg-transparent">
          <Routes>
            <Route
              path="/login"
              element={
                <RedirectIfAuth>
                  <Login />
                </RedirectIfAuth>
              }
            />
            <Route
              path="/registro"
              element={
                <RedirectIfAuth>
                  <Register />
                </RedirectIfAuth>
              }
            />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="/destinos"
              element={
                <RequireAuth>
                  <Destinations />
                </RequireAuth>
              }
            />
            <Route
              path="/reservas"
              element={
                <RequireAuth>
                  <Reservation />
                </RequireAuth>
              }
            />
            <Route
              path="/mis-reservaciones"
              element={
                <RequireAuth>
                  <MyReservations />
                </RequireAuth>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;

