import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";

const ScheduleList = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "agendamentos"), orderBy("criadoEm", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const lista = snapshot.docs.map((documento) => ({
          id: documento.id,
          ...documento.data()
        }));
        setAgendamentos(lista);
        setCarregando(false);
      },
      (error) => {
        console.error("Erro ao escutar agendamentos do Firebase:", error);
        setCarregando(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAlterarStatus = async (id, novoStatus) => {
    try {
      const docRef = doc(db, "agendamentos", id);
      await updateDoc(docRef, { status: novoStatus });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Deseja realmente excluir este agendamento?")) {
      try {
        const docRef = doc(db, "agendamentos", id);
        await deleteDoc(docRef);
      } catch (error) {
        console.error("Erro ao excluir agendamento:", error);
      }
    }
  };

  if (carregando) {
    return <p style={{ color: "#d4af37", textAlign: "center", padding: "20px" }}>A carregar agendamentos da nuvem...</p>;
  }

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", color: "#fff" }}>
      <h2 style={{ color: "#d4af37", textAlign: "center", marginBottom: "20px" }}>Agendamentos em Tempo Real</h2>
      
      {agendamentos.length === 0 ? (
        <p style={{ color: "#aaa", textAlign: "center" }}>Nenhum agendamento registado até ao momento.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {agendamentos.map((item) => (
            <div key={item.id} style={{ backgroundColor: "#161616", border: "1px solid #d4af37", borderRadius: "8px", padding: "15px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#fcf6ba", fontWeight: "bold" }}>
                <span>👤 {item.nome}</span>
                <span style={{ color: item.status === "Concluído" ? "#4caf50" : "#ff9800" }}>{item.status || "Pendente"}</span>
              </div>
              <div style={{ margin: "10px 0", color: "#ccc", fontSize: "0.9rem" }}>
                <p>📞 {item.telefone} | ✂️ {item.servico}</p>
                <p>📅 {item.data} às ⏰ {item.horario}</p>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleAlterarStatus(item.id, "Concluído")} style={{ backgroundColor: "#1b5e20", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>✓ Concluído</button>
                <button onClick={() => handleExcluir(item.id)} style={{ backgroundColor: "#c62828", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>🗑️ Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduleList;