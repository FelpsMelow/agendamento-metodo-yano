'use client';
import { useEffect, useState } from 'react';
import { reportsClient } from '@/services/reports.client';
import styles from './PatientsReport.module.scss';

export function PatientsReport() {
  const [search, setSearch] = useState(''); const [data, setData] = useState<any>({ items: [] });
  useEffect(() => { reportsClient.patients(search, 1, 30).then(setData); }, [search]);
  return <section className={styles.root}><div className={styles.actions}><input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar paciente" /><a href={reportsClient.patientsExportUrl(search)} target="_blank">Exportar Excel</a></div><table><thead><tr><th>Matr</th><th>Nome</th><th>E-mail</th><th>Telefones</th><th>Cintura Escapular</th><th>Cintura Pélvica</th></tr></thead><tbody>{data.items?.map((p:any)=><tr key={p._id}><td>{p.legacyId ?? p._id}</td><td>{p.name}</td><td>{p.email || '-'}</td><td>{[p.phones?.phone1,p.phones?.phone2,p.phones?.mobile1,p.phones?.mobile2].filter(Boolean).join(' / ') || '-'}</td><td>{p.scapularWaist || '-'}</td><td>{p.pelvicWaist || '-'}</td></tr>)}</tbody></table></section>;
}
