'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ReferralForm } from '@/components/referrals/ReferralForm';
import { referralsClient } from '@/services/referrals.client';
import { ReferralFormValues } from '@/schemas/referral.schema';
import styles from './page.module.scss';

export default function EditarIndicacaoPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [initialName, setInitialName] = useState<string>('');

  useEffect(() => {
    referralsClient.getById(params.id).then((r) => setInitialName(r.name));
  }, [params.id]);

  const onSubmit = async (values: ReferralFormValues) => {
    await referralsClient.update(params.id, values);
    router.push('/dashboard/indicacoes');
  };

  return <div className={styles.page}><h1>Cadastro de Indicações</h1>{initialName && <ReferralForm initialValues={{ name: initialName }} onSubmit={onSubmit} />}</div>;
}
