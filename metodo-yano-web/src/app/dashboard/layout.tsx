import { DashboardLayout } from '@/components/layout/DashboardLayout';
import styles from './layout.module.scss';

const MOCK_USER = {
  id: 'temp-user-id',
  clinicId: 'temp-clinic-id',
  name: 'Usuário Método Yano',
  email: 'usuario@metodoyano.com.br',
  role: 'admin' as const,
  isProfessional: false,
};

export default function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <DashboardLayout user={MOCK_USER}>{children}</DashboardLayout>
    </div>
  );
}
