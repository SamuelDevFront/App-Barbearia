import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";

const AppointmentForm = () => {
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
    if (usuarioLogado) {
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
    }
  }, []);

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

      // Consulta no Firebase para garantir que o horário não está reservado
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

      // Grava no Cloud Firestore
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
      console.error("Erro ao salvar no Firebase:", error);
      alert("Erro ao conectar com o banco de dados. Tente novamente em instantes.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#161616", padding: "25px", borderRadius: "12px", border: "1px solid #d4af37", maxWidth: "450px", margin: "0 auto", color: "#fff" }}>
      {agendadoComSucesso ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem" }}>✅</div>
          <h2 style={{ color: "#d4af37" }}>Agendamento Confirmado!</h2>
          <p style={{ marginTop: "10px", lineHeight: "1.5" }}>
            Seu horário para <strong>{formData.servico}</strong> foi agendado para o dia <strong>{dataFormatadaBR}</strong> às <strong>{formData.horario}</strong>.
          </p>
          <button onClick={() => setAgendadoComSucesso(false)} style={{ width: "100%", padding: "12px", backgroundColor: "#d4af37", color: "#000", fontWeight: "bold", border: "none", borderRadius: "6px", marginTop: "20px", cursor: "pointer" }}>
            Fazer Novo Agendamento
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h2 style={{ color: "#d4af37", textAlign: "center" }}>AGENDAR HORÁRIO</h2>
          
          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "0.85rem", color: "#fcf6ba" }}>Nome Completo:</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#121212", color: "#fff" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "0.85rem", color: "#fcf6ba" }}>WhatsApp / Telefone:</label>
            <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#121212", color: "#fff" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "0.85rem", color: "#fcf6ba" }}>Serviço Desejado:</label>
            <select name="servico" value={formData.servico} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#121212", color: "#fff" }}>
              <option value="Corte normal - R$ 45,00">Corte normal - R$ 45,00</option>
              <option value="Barba completa - R$ 35,00">Barba completa - R$ 35,00</option>
              <option value="Sobrancelha - R$ 20,00">Sobrancelha - R$ 20,00</option>
              <option value="Corte + Barba (Combo) - R$ 70,00">Corte + Barba (Combo) - R$ 70,00</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "0.85rem", color: "#fcf6ba" }}>Data do Atendimento:</label>
            <input type="date" name="data" min={hoje} value={formData.data} onChange={handleChange} required style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#121212", color: "#fff" }} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontSize: "0.85rem", color: "#fcf6ba" }}>Horário:</label>
            <select name="horario" value={formData.horario} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #333", backgroundColor: "#121212", color: "#fff" }}>
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

          <button type="submit" disabled={enviando} style={{ width: "100%", padding: "12px", backgroundColor: "#d4af37", color: "#000", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: enviando ? "not-allowed" : "pointer" }}>
            {enviando ? "A Agendar..." : "Confirmar Agendamento"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;