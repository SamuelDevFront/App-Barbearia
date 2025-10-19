// src/pages/Cadastro.jsx
import React, { useState, useEffect } from "react";
import "./Cadastro.scss"; // se quiser estilizar depois

function Cadastro() {
    const [clientes, setClientes] = useState([]);
    const [formData, setFormData] = useState({
        nome: "",
        telefone: "",
        email: "",
    });

    // Carregar os dados salvos ao iniciar
    useEffect(() => {
        const data = localStorage.getItem("clientes");
        if (data) {
            setClientes(JSON.parse(data));
        }
    }, []);

    // Salvar no localStorage sempre que mudar a lista
    useEffect(() => {
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }, [clientes]);

    // Atualiza os campos do formulário
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Envia o formulário e salva o cliente
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.nome || !formData.telefone) {
            alert("Preencha pelo menos nome e telefone!");
            return;
        }

        const novoCliente = { id: Date.now(), ...formData };
        setClientes([...clientes, novoCliente]);

        // Limpar campos
        setFormData({ nome: "", telefone: "", email: "" });
    };

    // Excluir cliente
    const handleDelete = (id) => {
        const filtrados = clientes.filter((c) => c.id !== id);
        setClientes(filtrados);
    };

    return (
        <div className="cadastro-container">
            <h2>Cadastro de Clientes</h2>

            <form onSubmit={handleSubmit} className="cadastro-form">
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome do cliente"
                    value={formData.nome}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="telefone"
                    placeholder="Telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail (opcional)"
                    value={formData.email}
                    onChange={handleChange}
                />
                <button type="submit">Cadastrar</button>
            </form>

            <h3>Clientes cadastrados</h3>
            <ul className="lista-clientes">
                {clientes.length === 0 ? (
                    <p>Nenhum cliente cadastrado ainda.</p>
                ) : (
                    clientes.map((cliente) => (
                        <li key={cliente.id}>
                            <strong>{cliente.nome}</strong> — {cliente.telefone}{" "}
                            {cliente.email && <span>({cliente.email})</span>}
                            <button onClick={() => handleDelete(cliente.id)}>Excluir</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Cadastro;
