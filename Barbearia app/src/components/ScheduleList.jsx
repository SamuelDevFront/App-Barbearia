import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";

const Schedule = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    servico: "Corte normal - R$ 45,00",
    data: "",
    horario: "09:00"
  });

  const [agendadoComSucesso, setAgendadoComSucesso] = useState(false);
  const [dataFormatadaBR, setDataFormatadaBR] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const usuarioLogado = localStorage.getItem("usuarioLogado") || localStorage.getItem("cliente");
    if (!usuarioLogado) {
      alert("Por favor, faça seu cadastro ou login antes de realizar um agendamento.");
      navigate("/cadastro");
      return;
    }

    try {
      const dadosUsuario = JSON.parse(usuarioLogado);
      if (dadosUsuario && dadosUsuario.nome) {
        setFormData((prev) => ({
          ...prev,
          nome: dadosUsuario.nome || "",
          telefone: dadosUsuario.telefone || dadosUsuario.whatsapp || ""
        }));
      }
    } catch (e) {
      console.error("Erro ao carregar dados do usuário:", e);
    }
  }, [navigate]);

  const hoje = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatarDataBR = (dataString) => {
    if (!dataString) return "";
    const partes = dataString.split("-");
    if (partes.length === 3) {
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }
    return dataString;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome || !formData.telefone || !formData.data || !formData.horario) {
      alert("Por favor, preencha todos os campos para confirmar seu agendamento.");
      return;
    }

    const dataSelecionada = new Date(`${formData.data}T00:00:00`);
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    if (dataSelecionada < dataAtual) {
      alert("Não é possível realizar agendamentos em datas passadas. Escolha uma data futura.");
      return;
    }

    const diaDaSemana = dataSelecionada.getDay();
    if (diaDaSemana === 0 || diaDaSemana === 1) {
      alert("A Barbearia do Samuca não abre aos domingos e segundas-feiras. Por favor, escolha um dia de terça a sábado.");
      return;
    }

    const dataBR = formatarDataBR(formData.data);

    try {
      setEnviando(true);

      // Verificação de horário ocupado direto na nuvem (Firebase)
      const q = query(
        collection(db, "agendamentos"),
        where("data", "==", dataBR),
        where("horario", "==", formData.horario)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        alert(`O horário das ${formData.horario} no dia ${dataBR} já está reservado por outro cliente. Por favor, escolha outro horário ou data.`);
        setEnviando(false);
        return;
      }

      // Salva o agendamento no Firestore (nuvem)
      await addDoc(collection(db, "agendamentos"), {
        nome: formData.nome,
        telefone: formData.telefone,
        servico: formData.servico,
        data: dataBR,
        horario: formData.horario,
        status: "Pendente",
        criadoEm: serverTimestamp()
      });

      setDataFormatadaBR(dataBR);
      setAgendadoComSucesso(true);
    } catch (error) {
      console.error("Erro ao salvar agendamento no Firebase:", error);
      alert("Erro ao conectar com o servidor. Tente novamente em instantes.");
    } finally {
      setEnviando(false);
    }
  };

  const handleNovoAgendamento = () => {
    setAgendadoComSucesso(false);
    setFormData({
      nome: "",
      telefone: "",
      servico: "Corte normal - R$ 45,00",
      data: "",
      horario: "09:00"
    });
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
    cursor: enviando ? "not-allowed" : "pointer",
    textTransform: "uppercase",
    width: "100%",
    marginTop: "10px",
    opacity: enviando ? 0.7 : 1
  };

  return (
    <div style={{
      backgroundColor: "#0d0d0d",
      minHeight: "100vh",
      padding: "30px 12px",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      width: "100%"
    }}>
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(0.8) sepia(1) saturate(5) hue-rotate(5deg);
          cursor: pointer;
        }
        @media (max-width: 480px) {
          .schedule-card {
            padding: 20px 16px !important;
          }
          .schedule-title {
            font-size: 1.5rem !important;
          }
        }
      `}</style>

      <div className="schedule-card" style={{
        backgroundColor: "rgba(22, 22, 22, 0.95)",
        border: "1px solid rgba(212, 175, 55, 0.4)",
        borderRadius: "16px",
        padding: "35px",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
        boxSizing: "border-box"
      }}>
        
        <h1 className="schedule-title" style={{ 
          ...goldTextStyle, 
          fontSize: "2rem", 
          textAlign: "center", 
          marginBottom: "10px" 
        }}>
          AGENDAR HORÁRIO
        </h1>

        <p style={{ textAlign: "center", color: "#a0a0a0", fontSize: "0.85rem", marginBottom: "25px" }}>
          Escolha o serviço, a data e o horário para o seu atendimento na Barbearia do Samuca.
        </p>

        {agendadoComSucesso ? (
          <div style={{ textAlign: "center", padding: "15px 0" }}>
            <div style={{ fontSize: "2.8rem", marginBottom: "10px" }}>✅</div>
            <h2 style={{ color: "#fcf6ba", fontSize: "1.3rem", marginBottom: "10px" }}>
              Agendamento Confirmado!
            </h2>
            <p style={{ color: "#cccccc", fontSize: "0.9rem", marginBottom: "20px", lineHeight: "1.5" }}>
              Seu horário para <strong>{formData.servico}</strong> foi agendado para o dia <strong>{dataFormatadaBR}</strong> às <strong>{formData.horario}</strong>.
            </p>
            <button 
              onClick={handleNovoAgendamento}
              style={goldButtonStyle}
            >
              Fazer Novo Agendamento
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
            
            <div>
              <label style={{ display: "block", color: "#fcf6ba", fontSize: "0.85rem", marginBottom: "6px" }}>
                Nome Completo:
              </label>
              <input 
                type="text" 
                name="nome"
                value={formData.nome} 
                onChange={handleChange}
                placeholder="Seu nome completo"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#121212",
                  border: "1px solid #333333",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  boxSizing: "border-box"
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
                  fontSize: "0.95rem",
                  boxSizing: "border-box"
                }}
                required 
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#fcf6ba", fontSize: "0.85rem", marginBottom: "6px" }}>
                Serviço Desejado:
              </label>
              <select 
                name="servico"
                value={formData.servico}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#121212",
                  border: "1px solid #333333",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  boxSizing: "border-box"
                }}
              >
                <option value="Corte normal - R$ 45,00">Corte normal - R$ 45,00</option>
                <option value="Barba completa - R$ 35,00">Barba completa - R$ 35,00</option>
                <option value="Sobrancelha - R$ 20,00">Sobrancelha - R$ 20,00</option>
                <option value="Corte + Barba (Combo) - R$ 70,00">Corte + Barba (Combo) - R$ 70,00</option>
              </select>
            </div>

            <div>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", color: "#fcf6ba", fontSize: "0.85rem", marginBottom: "6px" }}>
                📅 Data do Atendimento:
              </label>
              <input 
                type="date" 
                name="data"
                min={hoje}
                value={formData.data} 
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#121212",
                  border: "1px solid #333333",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  boxSizing: "border-box"
                }}
                required 
              />
            </div>

            <div>
              <label style={{ display: "block", color: "#fcf6ba", fontSize: "0.85rem", marginBottom: "6px" }}>
                Horário:
              </label>
              <select 
                name="horario"
                value={formData.horario}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#121212",
                  border: "1px solid #333333",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  boxSizing: "border-box"
                }}
              >
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
              </select>
            </div>

            <button type="submit" disabled={enviando} style={goldButtonStyle}>
              {enviando ? "A Agendar..." : "Confirmar Agendamento"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default Schedule;