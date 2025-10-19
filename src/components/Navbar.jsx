import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { MdMargin } from "react-icons/md";

function Navbar({ darkMode, setDarkMode }) {
    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo">
                <span role="img" aria-label="tesoura">✂️</span> Samuca Barbearia
            </div>



            {/* Links */}
            <ul className="nav-links">
                <li><Link to="/">Início</Link></li>
                <li><Link to="/agendamento">Agendamento</Link></li>
            </ul>

            {/* Botão tema */}
            <div className="theme-toggle" onClick={toggleTheme}>
                {darkMode ? "🌙 Escuro" : "☀️ Claro"}
            </div>
        </nav>


    );
}


export default Navbar;
