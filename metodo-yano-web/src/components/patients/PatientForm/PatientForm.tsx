'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema, PatientFormValues } from '@/schemas/patient.schema';
import styles from './PatientForm.module.scss';

type Props = { initialValues?: Partial<PatientFormValues>; onSubmit: (values: PatientFormValues) => Promise<void> };
export function PatientForm({ initialValues, onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PatientFormValues>({ resolver: zodResolver(patientSchema), defaultValues: initialValues });
  return <form className={styles.form} onSubmit={handleSubmit(onSubmit)}><div className={styles.row}><label>Nome *</label><input {...register('name')} />{errors.name && <span>{errors.name.message}</span>}</div><div className={styles.row}><label>E-mail</label><input {...register('email')} /></div><div className={styles.row}><label>CPF</label><input {...register('cpf')} /></div><div className={styles.row}><label>Cintura Escapular</label><select {...register('scapularWaist')}><option value=""></option><option value="LE">LE</option><option value="LD">LD</option></select></div><div className={styles.row}><label>Cintura Pélvica</label><select {...register('pelvicWaist')}><option value=""></option><option value="LE">LE</option><option value="LD">LD</option></select></div><button type='submit' disabled={isSubmitting}>Salvar</button></form>;
}
