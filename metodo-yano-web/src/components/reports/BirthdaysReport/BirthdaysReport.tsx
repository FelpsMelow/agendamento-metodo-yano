'use client';
import { useEffect, useState } from 'react';
import { reportsClient } from '@/services/reports.client';
import styles from './BirthdaysReport.module.scss';

export function BirthdaysReport() {
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1); const [items, setItems] = useState<any[]>([]);
  useEffect(() => { reportsClient.birthdays(month).then(setItems); }, [month]);
  return <section className={styles.root}><div className={styles.actions}><label>Mês</label><select value={month} onChange={(e)=>setMonth(Number(e.target.value))}>{Array.from({length:12},(_,i)=><option key={i+1} value={i+1}>{i+1}</option>)}</select></div><table><thead><tr><th>Data de nascimento</th><th>Nome</th><th>Telefones</th></tr></thead><tbody>{items.map((p:any)=><tr key={p._id}><td>{new Date(p.birthDate).toLocaleDateString('pt-BR')}</td><td>{p.name}</td><td>{[p.phones?.phone1,p.phones?.phone2,p.phones?.mobile1,p.phones?.mobile2].filter(Boolean).join(' / ') || '-'}</td></tr>)}</tbody></table></section>;
}
