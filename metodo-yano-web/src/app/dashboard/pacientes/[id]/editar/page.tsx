'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { PatientForm } from '@/components/patients/PatientForm';
import { patientsClient } from '@/services/patients.client';
import styles from './page.module.scss';

export default function EditarPacientePage(){ const params=useParams<{id:string}>(); const router=useRouter(); const [initial,setInitial]=useState<any>(); useEffect(()=>{patientsClient.getById(params.id).then(setInitial);},[params.id]); if(!initial) return <div className={styles.page}>Carregando...</div>; return <div className={styles.page}><h1>Editar paciente</h1><PatientForm initialValues={initial} onSubmit={async(v)=>{await patientsClient.update(params.id,v);router.push('/dashboard/pacientes');}}/></div>; }
