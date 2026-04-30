'use client';

import { useEffect, useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { getDashboardData } from '@/services/dashboard.client';
import type { DashboardData } from '@/types/dashboard.types';
import styles from './page.module.scss';

export default function InicioPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch {
        setErrorMessage('Não foi possível carregar os dados do dashboard.');
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <section className={styles.page}>
      <PageHeader title="Sistema de Administração" />

      {isLoading ? <p className={styles.feedback}>Carregando dados do dashboard...</p> : null}
      {!isLoading && errorMessage ? <p className={`${styles.feedback} ${styles.error}`}>{errorMessage}</p> : null}

      {!isLoading && !errorMessage && data ? (
        <div className={styles.cards}>
          <Card>
            <div className={`${styles.metricCard} ${styles.orange}`}>
              <p className={styles.metricTitle}>PACIENTES CADASTRADOS</p>
              <p className={styles.metricValue}>{data.totalPatients}</p>
            </div>
          </Card>

          <Card>
            <div className={`${styles.metricCard} ${styles.green}`}>
              <p className={styles.metricTitle}>TOTAL DE ATENDIMENTOS HOJE</p>
              <p className={styles.metricValue}>{data.todayAppointments}</p>
            </div>
          </Card>
        </div>
      ) : null}
    </section>
  );
}
