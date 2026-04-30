'use client';
import { User } from '@/types/user.types';
import styles from './ProfessionalTable.module.scss';

type Props = { data: User[]; onEdit: (user: User) => void; onDelete: (id: string) => void };
export function ProfessionalTable({ data, onEdit, onDelete }: Props) {
  if (!data.length) return <div className={styles.empty}>Nenhum profissional/usuário encontrado.</div>;
  return <table className={styles.table}><thead><tr><th>Nome</th><th>E-mail</th><th>Perfil</th><th>Profissional</th><th>Ativo</th><th>Editar</th><th>Excluir</th></tr></thead><tbody>{data.map((u) => <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.isProfessional ? 'Sim' : 'Não'}</td><td>{u.isActive ? 'Sim' : 'Não'}</td><td><button onClick={() => onEdit(u)}>Editar</button></td><td><button onClick={() => onDelete(u._id)}>Excluir</button></td></tr>)}</tbody></table>;
}
