'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { referralSchema, ReferralFormValues } from '@/schemas/referral.schema';
import styles from './ReferralForm.module.scss';

type Props = {
  initialValues?: Partial<ReferralFormValues>;
  onSubmit: (values: ReferralFormValues) => Promise<void>;
};

export function ReferralForm({ initialValues, onSubmit }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ReferralFormValues>({
    resolver: zodResolver(referralSchema),
    defaultValues: initialValues,
  });

  return <form className={styles.form} onSubmit={handleSubmit(onSubmit)}><div className={styles.field}><label htmlFor='name'>Indicação</label><input id='name' {...register('name')} />{errors.name && <span className={styles.error}>{errors.name.message}</span>}</div><button className={styles.submit} type='submit' disabled={isSubmitting}>Salvar</button></form>;
}
