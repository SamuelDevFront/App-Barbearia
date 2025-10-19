// src/components/ScheduleList.jsx
import React, { useEffect, useState } from 'react';
import { FaTrash, FaCheckCircle, FaClock } from 'react-icons/fa';
import './ScheduleList.scss';

const ScheduleList = ({ appointments = [], onDelete }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    // Garante que o React atualize corretamente o estado de admin
    useEffect(() => {
        const adminStatus = localStorage.getItem("isAdmin") === "true";
        setIsAdmin(adminStatus);
    }, []);

    if (!appointments || appointments.length === 0) return null;

    // Agrupar por data, guardando o índice original
    const grouped = appointments.reduce((acc, item, originalIndex) => {
        const dateKey = item.date;
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push({ item, originalIndex });
        return acc;
    }, {});

    // Função para criar data local
    const buildLocalDateTime = (dateStr, timeStr) => {
        const [y, m, d] = dateStr.split('-').map(Number);
        const [hh = 0, mm = 0] = (timeStr || '').split(':').map(Number);
        return new Date(y, m - 1, d, hh, mm, 0, 0);
    };

    // Ordenar as datas
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a) - new Date(b));

    const now = new Date();

    return (
        <div className="schedule-list">
            <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Agendamentos Confirmados</h3>

            {sortedDates.map((date) => {
                const group = grouped[date];

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
                            {group.map(({ item, originalIndex }) => {
                                const appointmentDate = buildLocalDateTime(item.date, item.time);

                                const nowClean = new Date(
                                    now.getFullYear(),
                                    now.getMonth(),
                                    now.getDate(),
                                    now.getHours(),
                                    now.getMinutes()
                                );

                                const appointmentClean = new Date(
                                    appointmentDate.getFullYear(),
                                    appointmentDate.getMonth(),
                                    appointmentDate.getDate(),
                                    appointmentDate.getHours(),
                                    appointmentDate.getMinutes()
                                );

                                const isPast = appointmentClean < nowClean;

                                const key = item.id ?? `${item.date}-${item.time}-${originalIndex}`;

                                return (
                                    <li
                                        key={key}
                                        className={isPast ? 'appointment past' : 'appointment future'}
                                    >
                                        <div className="info">
                                            {/* ✅ Só o admin vê o nome do cliente */}
                                            {isAdmin ? (
                                                <strong>{item.name}</strong>
                                            ) : (
                                                <strong>Agendado</strong>
                                            )}{" "}
                                            — {item.time}
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

                                            {/* ✅ Só o admin pode excluir */}
                                            {isAdmin && (
                                                <button
                                                    onClick={() => {
                                                        if (typeof onDelete === 'function') onDelete(originalIndex);
                                                    }}
                                                    title="Excluir"
                                                    aria-label="Excluir agendamento"
                                                >
                                                    <FaTrash />
                                                </button>
                                            )}
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
