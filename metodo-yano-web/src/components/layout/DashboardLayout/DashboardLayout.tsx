'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/layout/AppHeader';
import { AppSidebar } from '@/components/layout/AppSidebar';
import type { AuthUser } from '@/types/auth.types';
import styles from './DashboardLayout.module.scss';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: AuthUser | null;
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <AppSidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className={styles.contentArea}>
        <AppHeader userName={user?.name} onOpenSidebar={() => setMobileOpen(true)} />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
}
