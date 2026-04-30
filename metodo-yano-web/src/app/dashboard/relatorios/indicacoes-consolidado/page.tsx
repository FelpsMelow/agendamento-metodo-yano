import { PageHeader } from '@/components/layout/PageHeader';
import { ReferralsSummaryReport } from '@/components/reports/ReferralsSummaryReport';
import styles from './page.module.scss';

export default function RelatorioIndicacoesConsolidadoPage() {
  return <div className={styles.page}><PageHeader title="Consolidado de Indicações" subtitle="Visão consolidada de indicações." /><ReferralsSummaryReport /></div>;
}
