'use client';
import { ProfessionalSchedule } from '@/types/professional-schedule.types';
import styles from './ProfessionalScheduleTable.module.scss';

const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

type Props = { data: ProfessionalSchedule[]; onEdit: (item: ProfessionalSchedule) => void; onDelete: (id: string) => void };

export function ProfessionalScheduleTable({ data, onEdit, onDelete }: Props) {
  if (!data.length) return <div className={styles.empty}>Nenhum horário cadastrado.</div>;
  return <table className={styles.table}><thead><tr><th>Profissional</th><th>Dia da semana</th><th>Horário</th><th>Duração</th><th>Intervalo</th><th>Ativo</th><th>Editar</th><th>Excluir</th></tr></thead><tbody>{data.map((item) => {
    const professionalName = typeof item.professionalId === 'string' ? item.professionalId : item.professionalId.name;
    const intervalo = item.breakStartTime && item.breakEndTime ? `${item.breakStartTime} - ${item.breakEndTime}` : '-';
    return <tr key={item._id}><td>{professionalName}</td><td>{weekdays[item.weekday]}</td><td>{item.startTime} - {item.endTime}</td><td>{item.slotDurationMinutes} min</td><td>{intervalo}</td><td>{item.isActive ? 'Sim' : 'Não'}</td><td><button onClick={() => onEdit(item)}>Editar</button></td><td><button onClick={() => onDelete(item._id)}>Excluir</button></td></tr>;
  })}</tbody></table>;
}
