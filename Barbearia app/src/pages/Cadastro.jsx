import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cadastro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.telefone) {
      alert("Por favor, preencha pelo menos o Nome e o WhatsApp para continuar.");
      return;
    }

    // 1. Salva os dados do cliente no localStorage (chaves compatíveis com a verificação de login)
    const dadosCliente = {
      id: Date.now(),
      nome: formData.nome,
      telefone: formData.telefone,
      email: formData.email
    };

    // Guarda tanto em "usuarioLogado" quanto em "cliente" para compatibilidade total
    localStorage.setItem("usuarioLogado", JSON.stringify(dadosCliente));
    localStorage.setItem("cliente", JSON.stringify(dadosCliente));

    // Salva na lista geral de clientes cadastrados
    const clientesExistentes = JSON.parse(localStorage.getItem("clientes") || "[]");
    localStorage.setItem("clientes", JSON.stringify([dadosCliente, ...clientesExistentes]));

    alert(`Cadastro realizado com sucesso, ${formData.nome}! Redirecionando para o agendamento...`);

    // 2. REDIRECIONA IMEDIATAMENTE PARA A TELA DE AGENDAMENTO
    navigate("/agendamento");
  };

  const goldTextStyle = {
    background: "linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontFamily: "Georgia, serif",
    fontWeight: "bold"
  };

  const goldButtonStyle = {
    background: "linear-gradient(180deg, #ffe082 0%, #d4af37 45%, #aa771c 100%)",
    color: "#000000",
    fontWeight: "bold",
    fontSize: "0.95rem",
    letterSpacing: "1px",
    padding: "14px",
    borderRadius: "8px",
    border: "1px solid #fff3b0",
    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
    cursor: "pointer",
    textTransform: "uppercase",
    width: "100%",
    marginTop: "10px"
  };

  return (
    <div style={{
      backgroundColor: "#0d0d0d",
      minHeight: "100vh",
      padding: "50px 20px",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        backgroundColor: "rgba(22, 22, 22, 0.95)",
        border: "1px solid rgba(212, 175, 55, 0.4)",
        borderRadius: "16px",
        padding: "35px",
        maxWidth: "450px",
        width: "100%",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)"
      }}>
        <h1 style={{ 
          ...goldTextStyle, 
          fontSize: "2rem", 
          textAlign: "center", 
          marginBottom: "10px" 
        }}>
          CADASTRO DE CLIENTE
        </h1>

        <p style={{ textAlign: "center", color: "#a0a0a0", fontSize: "0.9rem", marginBottom: "30px" }}>
          Preencha seus dados abaixo para acessar a agenda da Barbearia do Samuca.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div>
            <label style={{ display: "block", color: "#fcf6ba", fontSize: "0.85rem", marginBottom: "6px" }}>
              Nome Completo:
            </label>
            <input 
              type="text" 
              name="nome"
              value={formData.nome} 
              onChange={handleChange}
              placeholder="Digite seu nome completo"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                backgroundColor: "#121212",
                border: "1px solid #333333",
                color: "#ffffff",
                fontSize: "0.95rem"
              }}
              required 
            />
          </div>

          <div>
            <label style={{ display: "block", color: "#fcf6ba", fontSize: "0.85rem", marginBottom: "6px" }}>
              WhatsApp / Telefone:
            </label>
            <input 
              type="text" 
              name="telefone"
              value={formData.telefone} 
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                backgroundColor: "#121212",
                border: "1px solid #333333",
                color: "#ffffff",
                fontSize: "0.95rem"
              }}
              required 
            />
          </div>

          <div>
            <label style={{ display: "block", color: "#fcf6ba", fontSize: "0.85rem", marginBottom: "6px" }}>
              E-mail (Opcional):
            </label>
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange}
              placeholder="seuemail@exemplo.com"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                backgroundColor: "#121212",
                border: "1px solid #333333",
                color: "#ffffff",
                fontSize: "0.95rem"
              }}
            />
          </div>

          <button type="submit" style={goldButtonStyle}>
            Cadastrar e Ir para Agendamento
          </button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;