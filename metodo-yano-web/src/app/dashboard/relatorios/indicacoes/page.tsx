import { PageHeader } from '@/components/layout/PageHeader';
import { ReferralsReport } from '@/components/reports/ReferralsReport';
import styles from './page.module.scss';

export default function RelatorioIndicacoesPage() {
  return <div className={styles.page}><PageHeader title="Relatório de Indicações" subtitle="Acompanhamento de indicações." /><ReferralsReport /></div>;
}
