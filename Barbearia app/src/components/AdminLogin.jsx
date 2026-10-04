import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";

const AdminLogin = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [autenticado, setAutenticado] = useState(false);
  const [senhaInput, setSenhaInput] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  // Senha do barbeiro (altere aqui se desejar outra senha)
  const SENHA_BARBEIRO = "1234";

  useEffect(() => {
    // Verifica se o barbeiro já fez login nesta sessão
    const sessaoAdmin = sessionStorage.getItem("adminAutenticado");
    if (sessaoAdmin === "true") {
      setAutenticado(true);
    }

    // Carrega os agendamentos salvos
    const dadosSalvos = JSON.parse(localStorage.getItem("agendamentos") || "[]");
    setAgendamentos(dadosSalvos);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (senhaInput === SENHA_BARBEIRO) {
      setAutenticado(true);
      sessionStorage.setItem("adminAutenticado", "true");
      setErroSenha("");
    } else {
      setErroSenha("Senha incorreta. Acesso restrito ao barbeiro.");
    }
  };

  const handleLogout = () => {
    setAutenticado(false);
    sessionStorage.removeItem("adminAutenticado");
  };

  const alterarStatus = (id, novoStatus) => {
    const listaAtualizada = agendamentos.map((item) =>
      item.id === id ? { ...item, status: novoStatus } : item
    );
    setAgendamentos(listaAtualizada);
    localStorage.setItem("agendamentos", JSON.stringify(listaAtualizada));
  };

  const removerAgendamento = (id) => {
    if (window.confirm("Deseja realmente apagar este agendamento?")) {
      const listaFiltrada = agendamentos.filter((item) => item.id !== id);
      setAgendamentos(listaFiltrada);
      localStorage.setItem("agendamentos", JSON.stringify(listaFiltrada));
    }
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
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #fff3b0",
    boxShadow: "0 4px 15px rgba(212, 175, 55, 0.4)",
    cursor: "pointer",
    textTransform: "uppercase",
    width: "100%",
    marginTop: "10px"
  };

  // 1. SE NÃO ESTIVER AUTENTICADO: MOSTRA TELA DE LOGIN RESTA AO BARBEIRO
  if (!autenticado) {
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
          maxWidth: "400px",
          width: "100%",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>🔒</div>
          <h1 style={{ ...goldTextStyle, fontSize: "1.8rem", marginBottom: "10px" }}>
            ACESSO RESTRITO
          </h1>
          <p style={{ color: "#a0a0a0", fontSize: "0.85rem", marginBottom: "25px" }}>
            Área exclusiva para o barbeiro. Insira sua senha para gerenciar a agenda.
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <div>
              <input
                type="password"
                placeholder="Digite a senha de acesso"
                value={senhaInput}
                onChange={(e) => setSenhaInput(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#121212",
                  border: "1px solid #333333",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  textAlign: "center"
                }}
                required
              />
            </div>

            {erroSenha && (
              <p style={{ color: "#e57373", fontSize: "0.85rem", margin: 0 }}>
                {erroSenha}
              </p>
            )}

            <button type="submit" style={goldButtonStyle}>
              Entrar no Painel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. SE ESTIVER AUTENTICADO: EXIBE O PAINEL DE AGENDAMENTOS
  return (
    <div style={{
      backgroundColor: "#0d0d0d",
      minHeight: "100vh",
      padding: "40px 20px",
      color: "#ffffff"
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "35px" }}>
          <div>
            <h1 style={{ ...goldTextStyle, fontSize: "2.2rem", letterSpacing: "2px" }}>
              PAINEL DO BARBEIRO - AGENDAMENTOS
            </h1>
            <p style={{ color: "#a0a0a0", marginTop: "4px" }}>
              Confira a agenda de clientes e gerencie os horários marcados.
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#222222",
              color: "#aaaaaa",
              border: "1px solid #444444",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "bold"
            }}
          >
            🔒 Sair
          </button>
        </div>

        {agendamentos.length === 0 ? (
          <div style={{
            backgroundColor: "#161616",
            border: "1px solid rgba(212, 175, 55, 0.2)",
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center",
            color: "#888888"
          }}>
            Nenhum agendamento realizado até o momento.
          </div>
        ) : (
          <div style={{ display: "grid", gap: "16px" }}>
            {agendamentos.map((item) => (
              <div 
                key={item.id}
                style={{
                  backgroundColor: "#161616",
                  border: "1px solid rgba(212, 175, 55, 0.3)",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "15px"
                }}
              >
                <div>
                  <h3 style={{ color: "#fcf6ba", fontSize: "1.2rem", marginBottom: "6px" }}>
                    👤 {item.nome}
                  </h3>
                  <p style={{ color: "#cccccc", fontSize: "0.9rem", margin: "3px 0" }}>
                    📞 WhatsApp: {item.telefone}
                  </p>
                  <p style={{ color: "#cccccc", fontSize: "0.9rem", margin: "3px 0" }}>
                    ✂️ Serviço: {item.servico}
                  </p>
                  <p style={{ color: "#d4af37", fontWeight: "bold", fontSize: "0.95rem", margin: "6px 0 0 0" }}>
                    📅 Data: {item.data} às {item.horario}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    fontWeight: "bold",
                    backgroundColor: item.status === "Concluído" ? "#1e4620" : item.status === "Cancelado" ? "#4a1818" : "#3d300d",
                    color: item.status === "Concluído" ? "#81c784" : item.status === "Cancelado" ? "#e57373" : "#ffe082"
                  }}>
                    {item.status || "Pendente"}
                  </span>

                  <button 
                    onClick={() => alterarStatus(item.id, "Concluído")}
                    style={{
                      backgroundColor: "#2e7d32",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontWeight: "bold"
                    }}
                  >
                    ✓ Concluir
                  </button>

                  <button 
                    onClick={() => removerAgendamento(item.id)}
                    style={{
                      backgroundColor: "#c62828",
                      color: "#fff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontWeight: "bold"
                    }}
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminLogin;