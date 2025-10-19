import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaCalendarAlt, FaUserShield } from "react-icons/fa";
import "./HamburgerMenu.scss";

function HamburgerMenu() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path) => {
        navigate(path);
        setOpen(false);
    };

    return (
        <>
            {/* Ícone do menu */}
            <button className="hamburger-icon" onClick={() => setOpen(true)}>
                <FaBars />
            </button>

            {/* Menu lateral */}
            <div className={`side-menu ${open ? "open" : ""}`}>
                <button className="close-btn" onClick={() => setOpen(false)}>
                    <FaTimes />
                </button>

                <h2>Menu</h2>

                <nav className="menu-links">
                    <button onClick={() => handleNavigate("/")}>
                        <FaHome /> Início
                    </button>
                    <button onClick={() => handleNavigate("/agendamento")}>
                        <FaCalendarAlt /> Agendamento
                    </button>
                    {location.pathname === "/admin" ? (
                        <button onClick={() => handleNavigate("/agendamento")}>
                            <FaCalendarAlt /> Ir para Agendamentos
                        </button>
                    ) : (
                        <button onClick={() => handleNavigate("/admin")}>
                            <FaUserShield /> Área do Administrador
                        </button>
                    )}
                </nav>
            </div>

            {/* Fundo escuro quando o menu abre */}
            {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
        </>
    );
}

export default HamburgerMenu;
