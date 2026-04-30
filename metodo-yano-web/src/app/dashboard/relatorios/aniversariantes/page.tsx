import { PageHeader } from '@/components/layout/PageHeader';
import { BirthdaysReport } from '@/components/reports/BirthdaysReport';
import styles from './page.module.scss';

export default function RelatorioAniversariantesPage() {
  return <div className={styles.page}><PageHeader title="Relatório de Aniversariantes" subtitle="Pacientes aniversariantes por período." /><BirthdaysReport /></div>;
}
