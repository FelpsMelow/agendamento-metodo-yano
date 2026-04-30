import { PageHeader } from '@/components/layout/PageHeader';
import { PatientsReport } from '@/components/reports/PatientsReport';
import styles from './page.module.scss';

export default function RelatorioPacientesPage() {
  return <div className={styles.page}><PageHeader title="Relatório de Pacientes" subtitle="Listagem e exportação de pacientes." /><PatientsReport /></div>;
}
