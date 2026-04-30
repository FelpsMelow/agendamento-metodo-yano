'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { patientsClient } from '@/services/patients.client';
import { PatientSearch } from '@/components/patients/PatientSearch';
import { PatientTable } from '@/components/patients/PatientTable';
import styles from './page.module.scss';

export default function PacientesPage(){
  const [q,setQ]=useState(''); const [data,setData]=useState<any[]>([]);
  const load=()=>patientsClient.list(q).then(r=>setData(r.items));
  useEffect(()=>{load();},[q]);
  return <div className={styles.page}><div className={styles.actions}><Link href='/dashboard/pacientes/novo'>Novo</Link><a href={patientsClient.exportUrl()}>Gerar Excel</a></div><PatientSearch value={q} onChange={setQ}/><PatientTable data={data} onDelete={async(id)=>{if(confirm('Confirma exclusão?')){await patientsClient.remove(id);load();}}}/></div>
}
