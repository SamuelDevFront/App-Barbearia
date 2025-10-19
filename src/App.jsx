// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Schedule from "./pages/Schedule";
import ThemeToggle from "./components/ThemeToggle";
import WhatsAppButton from "./components/WhatsAppButton";
import AdminLogin from "./components/AdminLogin";
import HamburgerMenu from "./components/HamburgerMenu";
import "./App.scss";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <BrowserRouter>
        {/* Menu hambúrguer fixo no canto esquerdo */}
        <HamburgerMenu />

        {/* Topo com título central e tema à direita */}
        <div className="top-bar">
          <div className="brand-title">Samuca Barbearia</div>
          <div className="theme-toggle-container">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>

        {/* Conteúdo principal abaixo do topo */}
        <div style={{ marginTop: "80px" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/agendamento" element={<Schedule />} />
            <Route path="/admin" element={<AdminLogin />} />
          </Routes>
        </div>

        <WhatsAppButton />
      </BrowserRouter>
    </div>
  );
}

export default App;
