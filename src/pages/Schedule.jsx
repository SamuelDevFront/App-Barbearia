import React, { useState, useEffect } from 'react';
import './Schedule.scss';
import AppointmentForm from '../components/AppointmentForm';
import ScheduleList from '../components/ScheduleList';

const Schedule = () => {
    // carrega agendamentos do localStorage
    const [appointments, setAppointments] = useState(() => {
        const stored = localStorage.getItem('appointments');
        return stored ? JSON.parse(stored) : [];
    });

    // carrega nome salvo no localStorage (ou vazio)
    const [name, setName] = useState(() => localStorage.getItem('savedUserName') || '');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('todos');

    useEffect(() => {
        const storedFilter = localStorage.getItem('selectedFilter');
        if (storedFilter) setFilter(storedFilter);
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedFilter', filter);
    }, [filter]);

    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);

    // handleNameChange aceita event OR string (robusto)
    const handleNameChange = (eOrValue) => {
        const value = typeof eOrValue === 'string' ? eOrValue : eOrValue.target.value;
        setName(value);
        localStorage.setItem('savedUserName', value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !date || !time) {
            setError('Preencha todos os campos.');
            return;
        }

        // cria Date a partir de date + time (formato ISO local)
        const selectedDateTime = new Date(`${date}T${time}`);
        const now = new Date();

        if (selectedDateTime < now) {
            setError('Você não pode agendar para um horário no passado.');
            return;
        }

        const hour = selectedDateTime.getHours();
        if (hour < 9 || hour >= 18) {
            setError('Horário inválido. Agende entre 09:00 e 18:00.');
            return;
        }

        const exists = appointments.some((app) => app.date === date && app.time === time);
        if (exists) {
            setError('Já existe um agendamento para esse horário.');
            return;
        }

        const newAppointment = { name, date, time };
        setAppointments([...appointments, newAppointment]);

        // se quiser manter o nome preenchido após enviar, comente a próxima linha
        // setName(''); 

        setDate('');
        setTime('');
        setMessage('Agendamento realizado com sucesso! ✅');
        setError('');

        setTimeout(() => setMessage(''), 3000);
    };

    const handleDelete = (indexToDelete) => {
        const filtered = appointments.filter((_, index) => index !== indexToDelete);
        setAppointments(filtered);
    };

    const filteredAppointments = [...appointments]
        .filter((app) => {
            if (filter === 'todos') return true;
            const today = new Date().toISOString().split('T')[0];
            return filter === 'hoje' ? app.date === today : app.date > today;
        })
        .sort((a, b) => {
            const dateTimeA = new Date(`${a.date}T${a.time}`);
            const dateTimeB = new Date(`${b.date}T${b.time}`);
            return dateTimeA - dateTimeB;
        });

    return (
        <div className="schedule-page">
            <h2>Agende seu horário</h2>

            <AppointmentForm
                name={name}
                date={date}
                time={time}
                onNameChange={handleNameChange}
                onDateChange={(e) => setDate(e.target.value)}
                onTimeChange={(e) => setTime(e.target.value)}
                onSubmit={handleSubmit}
                error={error}
                message={message}
            />

            <div className="filter-buttons">
                <button onClick={() => setFilter('todos')} className={filter === 'todos' ? 'active' : ''}>
                    Todos
                </button>
                <button onClick={() => setFilter('hoje')} className={filter === 'hoje' ? 'active' : ''}>
                    Hoje
                </button>
                <button onClick={() => setFilter('futuros')} className={filter === 'futuros' ? 'active' : ''}>
                    Futuros
                </button>
            </div>

            <ScheduleList appointments={filteredAppointments} onDelete={handleDelete} />
        </div>
    );
};

export default Schedule;
