'use client';
import Link from 'next/link';
import { Referral } from '@/types/referral.types';
import styles from './ReferralTable.module.scss';

type Props = { data: Referral[]; onDelete: (id: string) => void };

export function ReferralTable({ data, onDelete }: Props) {
  if (!data.length) return <div className={styles.empty}>Nenhuma indicação encontrada.</div>;

  return <table className={styles.table}><thead><tr><th>Indicação</th><th>Editar</th><th>Excluir</th></tr></thead><tbody>{data.map((referral) => <tr key={referral._id}><td>{referral.name}</td><td><Link href={`/dashboard/indicacoes/${referral._id}/editar`}>Editar</Link></td><td><button type='button' onClick={() => onDelete(referral._id)}>Excluir</button></td></tr>)}</tbody></table>;
}
