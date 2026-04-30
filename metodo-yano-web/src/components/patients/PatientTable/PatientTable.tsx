'use client';
import Link from 'next/link';
import { Patient } from '@/types/patient.types';
import styles from './PatientTable.module.scss';

type Props = { data: Patient[]; onDelete: (id: string) => void };
export function PatientTable({ data, onDelete }: Props) {
  if (!data.length) return <div className={styles.empty}>Nenhum paciente encontrado.</div>;
  return <table className={styles.table}><thead><tr><th>Matr</th><th>Nome</th><th>E-mail</th><th>Telefones</th><th>C. Escapular</th><th>C. Pélvica</th><th>Editar</th><th>Excluir</th></tr></thead><tbody>{data.map((p)=><tr key={p._id}><td>{p.legacyId ?? p._id.slice(-6)}</td><td>{p.name}</td><td>{p.email||'-'}</td><td>{p.phones?.allNormalized?.join(' / ')||'-'}</td><td>{p.scapularWaist||'-'}</td><td>{p.pelvicWaist||'-'}</td><td><Link href={`/dashboard/pacientes/${p._id}/editar`}>Editar</Link></td><td><button onClick={()=>onDelete(p._id)}>Excluir</button></td></tr>)}</tbody></table>;
}
