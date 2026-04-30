'use client';

import { logout } from '@/services/auth.client';
import type { AuthUser } from '@/types/auth.types';
import styles from './AppHeader.module.scss';

interface AppHeaderProps {
  userName?: AuthUser['name'];
  onOpenSidebar: () => void;
}

export function AppHeader({ userName, onOpenSidebar }: AppHeaderProps) {
  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <header className={styles.header}>
      <button type="button" className={styles.menuButton} onClick={onOpenSidebar}>
        ☰
      </button>

      <div className={styles.userInfo}>
        <span className={styles.welcome}>Olá, {userName ?? 'Usuário'}</span>
        <button type="button" className={styles.logoutButton} onClick={handleLogout}>
          Sair
        </button>
      </div>
    </header>
  );
}
