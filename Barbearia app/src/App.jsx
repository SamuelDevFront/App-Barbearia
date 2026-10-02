import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cadastro from "./pages/Cadastro";
import Schedule from "./pages/Schedule";
import WhatsAppButton from "./components/WhatsAppButton";
import AdminLogin from "./components/AdminLogin";

import './App.css';
import "./App.scss";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? "dark" : "light"}>
      <BrowserRouter>
        {/* Navbar única padronizada no topo */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Conteúdo principal e rotas da aplicação */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/agendamento" element={<Schedule />} />
            <Route path="/admin" element={<AdminLogin />} />
          </Routes>
        </main>

        <WhatsAppButton />
      </BrowserRouter>
    </div>
  );
}

export default App;