// src/components/AdminLogin.jsx
import React, { useState } from "react";
import "./AdminLogin.scss";

const AdminLogin = () => {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [logged, setLogged] = useState(localStorage.getItem("isAdmin") === "true");

    const handleLogin = (e) => {
        e.preventDefault();
        // senha simples temporária (troque por algo seguro depois)
        if (password === "admin123") {
            localStorage.setItem("isAdmin", "true");
            setLogged(true);
            setError("");
            alert("✅ Você entrou como Administrador.");
            // recarrega para o app reconhecer o novo estado
            window.location.reload();
        } else {
            setError("Senha incorreta.");
        }
    };

    const handleLogout = () => {
        localStorage.setItem("isAdmin", "false");
        setLogged(false);
        alert("🔒 Saiu do modo admin.");
        window.location.reload();
    };

    if (logged) {
        return (
            <div className="admin-logged">
                <p>👑 Logado como <strong>Administrador</strong>.</p>
                <button onClick={handleLogout}>Sair do modo Admin</button>
            </div>
        );
    }

    return (
        <div className="admin-login-container">
            <h2>Login do Administrador</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="password"
                    placeholder="Digite a senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default AdminLogin;
