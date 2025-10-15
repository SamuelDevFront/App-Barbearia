// src/pages/Cadastro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.scss";

const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nome || !email) {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        // ✅ Salva o cadastro corretamente no localStorage
        localStorage.setItem("userData", JSON.stringify({ nome, email }));

        alert("Cadastro realizado com sucesso!");
        navigate("/agendamento");
    };

    return (
        <div className="cadastro-container">
            <h2>Crie sua conta</h2>
            <form onSubmit={handleSubmit} className="cadastro-form">
                <label>
                    Nome completo:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Digite seu nome"
                        required
                    />
                </label>

                <label>
                    E-mail:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu e-mail"
                        required
                    />
                </label>

                <button type="submit" className="cadastro-button">
                    Cadastrar
                </button>
            </form>
        </div>
    );
};

export default Cadastro;
