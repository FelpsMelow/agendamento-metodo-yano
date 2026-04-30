'use client';
import { useRouter } from 'next/navigation';
import { ReferralForm } from '@/components/referrals/ReferralForm';
import { referralsClient } from '@/services/referrals.client';
import { ReferralFormValues } from '@/schemas/referral.schema';
import styles from './page.module.scss';

export default function NovaIndicacaoPage() {
  const router = useRouter();
  const onSubmit = async (values: ReferralFormValues) => {
    await referralsClient.create(values);
    router.push('/dashboard/indicacoes');
  };

  return <div className={styles.page}><h1>Cadastro de Indicações</h1><ReferralForm onSubmit={onSubmit} /></div>;
}
