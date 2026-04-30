'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { professionalSchema, ProfessionalFormValues } from '@/schemas/professional.schema';
import styles from './ProfessionalForm.module.scss';

type Props = { initialValues?: Partial<ProfessionalFormValues>; requirePassword?: boolean; onSubmit: (values: ProfessionalFormValues) => Promise<void>; onCancel: () => void; };

export function ProfessionalForm({ initialValues, requirePassword = false, onSubmit, onCancel }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfessionalFormValues>({ resolver: zodResolver(professionalSchema), defaultValues: { role: 'professional', isActive: true, isProfessional: true, ...initialValues } });

  return <form className={styles.form} onSubmit={handleSubmit(async (values) => { if (requirePassword && (!values.password || values.password.length < 8)) return; await onSubmit(values); })}>
    <input placeholder='Nome' {...register('name')} />
    <input placeholder='E-mail' {...register('email')} />
    <select {...register('role')}><option value='admin'>Administrador</option><option value='professional'>Profissional</option><option value='receptionist'>Recepcionista</option></select>
    <label><input type='checkbox' {...register('isProfessional')} />É profissional</label>
    <label><input type='checkbox' {...register('isActive')} />Ativo</label>
    <input type='password' placeholder='Senha' {...register('password')} />
    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
    <div className={styles.actions}><button type='button' onClick={onCancel}>Cancelar</button><button type='submit' disabled={isSubmitting}>Salvar</button></div>
  </form>;
}
