'use client';
import { useEffect, useState } from 'react';
import { reportsClient } from '@/services/reports.client';
import styles from './ReferralsSummaryReport.module.scss';

export function ReferralsSummaryReport() {
  const [startDate, setStartDate] = useState(''); const [endDate, setEndDate] = useState(''); const [data, setData] = useState<any>({ items: [], totalGeral: 0 });
  const load = () => reportsClient.referralsSummary(startDate, endDate).then(setData);
  useEffect(() => { load(); }, []);
  return <section className={styles.root}><div className={styles.filters}><input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} /><input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} /><button onClick={load}>Filtrar</button></div><table><thead><tr><th>Indicação</th><th>Quantidade</th><th>Percentual</th></tr></thead><tbody>{data.items.map((i:any)=><tr key={i.indicacao}><td>{i.indicacao}</td><td>{i.quantidade}</td><td>{i.percentual}%</td></tr>)}</tbody></table><div className={styles.chart}>{data.items.map((i:any)=><div key={i.indicacao} className={styles.barRow}><span>{i.indicacao}</span><progress max={100} value={i.percentual} className={styles.bar} /><strong>{i.percentual}%</strong></div>)}</div></section>;
}
