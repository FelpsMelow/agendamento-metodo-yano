'use client';
import { useRouter } from 'next/navigation';
import { PatientForm } from '@/components/patients/PatientForm';
import { patientsClient } from '@/services/patients.client';
import styles from './page.module.scss';

export default function NovoPacientePage(){ const router=useRouter(); return <div className={styles.page}><h1>Novo paciente</h1><PatientForm onSubmit={async(v)=>{await patientsClient.create(v);router.push('/dashboard/pacientes');}}/></div>; }
