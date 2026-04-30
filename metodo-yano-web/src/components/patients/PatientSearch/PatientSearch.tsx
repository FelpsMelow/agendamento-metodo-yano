'use client';
import styles from './PatientSearch.module.scss';

type Props = { value: string; onChange: (v: string) => void };
export function PatientSearch({ value, onChange }: Props) {
  return <input className={styles.input} placeholder="Buscar por nome, CPF, e-mail ou telefone" value={value} onChange={(e) => onChange(e.target.value)} />;
}
