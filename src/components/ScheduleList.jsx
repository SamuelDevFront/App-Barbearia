// src/components/ScheduleList.jsx
import React from 'react';
import { FaTrash, FaCheckCircle, FaClock } from 'react-icons/fa';
import './ScheduleList.scss';

const ScheduleList = ({ appointments = [], onDelete }) => {
    if (!appointments || appointments.length === 0) return null;

    // Agrupar por data, guardando também o índice original do array "appointments"
    const grouped = appointments.reduce((acc, item, originalIndex) => {
        const dateKey = item.date; // format YYYY-MM-DD esperado
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push({ item, originalIndex });
        return acc;
    }, {});

    // Função utilitária para criar Date local a partir de item.date (YYYY-MM-DD) e item.time (HH:MM)
    const buildLocalDateTime = (dateStr, timeStr) => {
        // dateStr: "2025-10-13" ; timeStr: "17:00"
        const [y, m, d] = dateStr.split('-').map(Number);
        const [hh = 0, mm = 0] = (timeStr || '').split(':').map(Number);
        return new Date(y, m - 1, d, hh || 0, mm || 0, 0, 0);
    };

    // Agora renderizamos as datas ordenadas
    const sortedDates = Object.keys(grouped).sort((a, b) => {
        // ordem crescente
        const da = new Date(a + 'T00:00'); // ok para ordenação
        const db = new Date(b + 'T00:00');
        return da - db;
    });

    const now = new Date();

    return (
        <div className="schedule-list">
            <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Agendamentos Confirmados</h3>

            {sortedDates.map((date) => {
                const group = grouped[date]; // array de { item, originalIndex }

                // Exibe data no formato pt-BR com dia da semana
                let dateLabel = '';
                try {
                    const [y, m, d] = date.split('-').map(Number);
                    const dateObj = new Date(y, m - 1, d);
                    dateLabel = dateObj.toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                    });
                } catch (err) {
                    dateLabel = date;
                }

                return (
                    <div key={date} className="date-group">
                        <h4>{dateLabel}</h4>

                        <ul>
                            {group.map(({ item, originalIndex }, idx) => {
                                // Cria datetime local (evita problema de fuso)
                                const appointmentDate = buildLocalDateTime(item.date, item.time);
                                // normaliza agora com horas/minutos para comparação justa
                                const nowClean = new Date(
                                    now.getFullYear(),
                                    now.getMonth(),
                                    now.getDate(),
                                    now.getHours(),
                                    now.getMinutes(),
                                    0,
                                    0
                                );
                                const appointmentClean = new Date(
                                    appointmentDate.getFullYear(),
                                    appointmentDate.getMonth(),
                                    appointmentDate.getDate(),
                                    appointmentDate.getHours(),
                                    appointmentDate.getMinutes(),
                                    0,
                                    0
                                );

                                const isPast = appointmentClean < nowClean;

                                // chave segura: se item.id existir use, senão combine campos
                                const key = item.id ?? `${item.date}-${item.time}-${originalIndex}`;

                                return (
                                    <li
                                        key={key}
                                        className={isPast ? 'appointment past' : 'appointment future'}
                                    >
                                        <div className="info">
                                            <strong>{item.name}</strong> — {item.time}
                                        </div>

                                        <div className="status">
                                            {isPast ? (
                                                <span className="past-label">
                                                    <FaClock className="icon" /> Passado
                                                </span>
                                            ) : (
                                                <span className="future-label">
                                                    <FaCheckCircle className="icon" /> Futuro
                                                </span>
                                            )}

                                            <button
                                                onClick={() => {
                                                    // chama onDelete com o índice original do appointment no array principal
                                                    if (typeof onDelete === 'function') onDelete(originalIndex);
                                                }}
                                                title="Excluir"
                                                aria-label="Excluir agendamento"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default ScheduleList;
