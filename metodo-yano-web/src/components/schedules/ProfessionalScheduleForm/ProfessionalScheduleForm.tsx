'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/types/user.types';
import { ProfessionalScheduleFormValues, professionalScheduleSchema } from '@/schemas/professional-schedule.schema';
import { ProfessionalSchedule } from '@/types/professional-schedule.types';
import styles from './ProfessionalScheduleForm.module.scss';

type Props = { professionals: User[]; initialValues?: ProfessionalSchedule | null; onCancel: () => void; onSubmit: (values: ProfessionalScheduleFormValues) => Promise<void> };
const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];

export function ProfessionalScheduleForm({ professionals, initialValues, onCancel, onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfessionalScheduleFormValues>({ resolver: zodResolver(professionalScheduleSchema), defaultValues: { professionalId: typeof initialValues?.professionalId === 'string' ? initialValues.professionalId : initialValues?.professionalId?._id, weekday: initialValues?.weekday ?? 1, startTime: initialValues?.startTime ?? '', endTime: initialValues?.endTime ?? '', slotDurationMinutes: initialValues?.slotDurationMinutes ?? 30, breakStartTime: initialValues?.breakStartTime ?? '', breakEndTime: initialValues?.breakEndTime ?? '', isActive: initialValues?.isActive ?? true } });

  return <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
    <select {...register('professionalId')}><option value=''>Selecione o profissional</option>{professionals.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}</select>
    <select {...register('weekday', { valueAsNumber: true })}>{weekdays.map((w, i) => <option key={w} value={i}>{w}</option>)}</select>
    <input type='time' {...register('startTime')} />
    <input type='time' {...register('endTime')} />
    <input type='number' min={1} {...register('slotDurationMinutes', { valueAsNumber: true })} placeholder='Duração (min)' />
    <input type='time' {...register('breakStartTime')} />
    <input type='time' {...register('breakEndTime')} />
    <label><input type='checkbox' {...register('isActive')} />Ativo</label>
    <div className={styles.errors}>{Object.values(errors).map((e) => <p key={e.message}>{e.message}</p>)}</div>
    <div className={styles.actions}><button type='button' onClick={onCancel}>Cancelar</button><button type='submit' disabled={isSubmitting}>Salvar</button></div>
  </form>;
}
