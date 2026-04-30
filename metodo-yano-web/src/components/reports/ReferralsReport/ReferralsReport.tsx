'use client';
import { useEffect, useState } from 'react';
import { reportsClient } from '@/services/reports.client';
import styles from './ReferralsReport.module.scss';

export function ReferralsReport() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => { reportsClient.referrals().then(setItems); }, []);
  return <section className={styles.root}><table><thead><tr><th>Indicação</th><th>Editar</th><th>Excluir</th></tr></thead><tbody>{items.map((item)=><tr key={item._id}><td>{item.name}</td><td><a href={`/dashboard/indicacoes/${item._id}/editar`}>Editar</a></td><td><a href="/dashboard/indicacoes">Excluir</a></td></tr>)}</tbody></table></section>;
}
