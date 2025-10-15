// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Schedule from "./pages/Schedule"; // usa o Schedule existente
import ThemeToggle from "./components/ThemeToggle";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <BrowserRouter>
        {/* Navbar sempre visível */}
        <Navbar />

        {/* Alternar tema */}
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Rotas principais */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/agendamento" element={<Schedule />} />
        </Routes>

        {/* Botão flutuante do WhatsApp */}
        <WhatsAppButton />
      </BrowserRouter>
    </div>
  );
}

export default App;
