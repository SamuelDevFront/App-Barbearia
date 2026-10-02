import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";

const Navbar = ({ darkMode, setDarkMode }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar-gold">
      <div className="navbar-container">
        
        {/* LADO ESQUERDO: MENU HAMBÚRGUER + LOGO */}
        <div className="navbar-left">
          <button 
            className="btn-hamburger-gold" 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <span className="logo-icon">✂️</span>
            <span className="logo-text">SAMUCA Corte & Barba</span>
          </Link>
        </div>

        {/* CENTRO / NAVEGAÇÃO DESKTOP */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">Início</Link>
          <Link to="/agendamento" className="nav-link">Agendamento</Link>
        </div>

        {/* LADO DIREITO: BOTÃO DE TEMA + BOTÃO AGENDAR */}
        <div className="navbar-actions">
          {setDarkMode && (
            <button 
              className="btn-theme-gold"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️ Claro" : "🌙 Escuro"}
            </button>
          )}

          <button 
            className="btn-agendar-gold"
            onClick={() => {
              closeMenu();
              navigate("/agendamento");
            }}
          >
            ✂️ AGENDAR
          </button>
        </div>

      </div>

      {/* MENU DROPDOWN / MOBILE DRAWER */}
      {isMenuOpen && (
        <div className="mobile-drawer-gold">
          <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
            Início
          </Link>
          <Link to="/agendamento" className="mobile-nav-link" onClick={closeMenu}>
            Agendamento
          </Link>
          <Link to="/cadastro" className="mobile-nav-link" onClick={closeMenu}>
            Cadastro
          </Link>
          <Link to="/admin" className="mobile-nav-link" onClick={closeMenu}>
            Painel Admin
          </Link>

          {setDarkMode && (
            <button 
              className="btn-theme-mobile"
              onClick={() => {
                setDarkMode(!darkMode);
              }}
            >
              {darkMode ? "☀️ Alternar para Modo Claro" : "🌙 Alternar para Modo Escuro"}
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;