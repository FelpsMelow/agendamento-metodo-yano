'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { referralsClient } from '@/services/referrals.client';
import { Referral } from '@/types/referral.types';
import { ReferralTable } from '@/components/referrals/ReferralTable';
import styles from './page.module.scss';

export default function IndicacoesPage() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const [items, setItems] = useState<Referral[]>([]);

  const load = async () => {
    const response = await referralsClient.list(q, page, limit);
    setItems(response.items);
    setTotal(response.total);
  };

  useEffect(() => { load(); }, [q, page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return <div className={styles.page}><div className={styles.header}><h1>Relatório de Indicações</h1><Link href='/dashboard/indicacoes/novo' className={styles.newButton}>Novo</Link></div><input className={styles.search} placeholder='Pesquisar indicação' value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }} /><ReferralTable data={items} onDelete={async (id) => { if (confirm('Confirma exclusão da indicação?')) { await referralsClient.remove(id); await load(); } }} /><div className={styles.pagination}><button type='button' disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Anterior</button><span>Página {page} de {totalPages}</span><button type='button' disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Próxima</button></div></div>;
}
