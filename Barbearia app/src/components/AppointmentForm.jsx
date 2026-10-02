import React, { useState, useEffect } from 'react';
import './AppointmentForm.scss';

const AppointmentForm = ({
    name,
    date,
    time,
    onNameChange,
    onDateChange,
    onTimeChange,
    onSubmit,
    error,
    message
}) => {
    const [savedNames, setSavedNames] = useState([]);

    // carregar nomes salvos do localStorage
    useEffect(() => {
        const storedNames = JSON.parse(localStorage.getItem('savedUserNames')) || [];
        setSavedNames(storedNames);
    }, []);

    // gera horários de 30 em 30 minutos
    const generateTimes = () => {
        const times = [];
        for (let hour = 9; hour < 18; hour++) {
            times.push(`${hour.toString().padStart(2, '0')}:00`);
            times.push(`${hour.toString().padStart(2, '0')}:30`);
        }
        times.push('18:00');
        return times;
    };

    const times = generateTimes();

    // quando o nome mudar, salva o novo nome na lista
    const handleNameChange = (e) => {
        const newName = e.target.value;
        onNameChange(e); // mantém o valor no estado principal

        if (newName.trim() !== '') {
            const updatedNames = Array.from(new Set([newName, ...savedNames])); // evita duplicados
            setSavedNames(updatedNames);
            localStorage.setItem('savedUserNames', JSON.stringify(updatedNames));
        }
    };

    // quando o formulário for enviado
    const handleSubmit = (e) => {
        onSubmit(e);
        // limpa o nome depois de enviar
        onNameChange({ target: { value: '' } });
    };

    return (
        <form className="appointment-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nome:</label>
                <input
                    type="text"
                    list="names-list"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Digite seu nome"
                />
                <datalist id="names-list">
                    {savedNames.map((n, i) => (
                        <option key={i} value={n} />
                    ))}
                </datalist>
            </div>

            <div className="form-group">
                <label>Data:</label>
                <input type="date" value={date} onChange={onDateChange} />
            </div>

            <div className="form-group">
                <label>Horário:</label>
                <select value={time} onChange={onTimeChange}>
                    <option value="">Selecione um horário</option>
                    {times.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn-agendar">Agendar</button>

            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}
        </form>
    );
};

export default AppointmentForm;
