'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo, useState } from 'react';
import styles from './AppSidebar.module.scss';

type MenuItem = {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
};

const MENU: MenuItem[] = [
  { label: 'Início', href: '/dashboard/inicio' },
  {
    label: 'Pacientes',
    children: [
      { label: 'Cadastrar Paciente', href: '/dashboard/pacientes/novo' },
      { label: 'Editar/Excluir Paciente', href: '/dashboard/pacientes' },
    ],
  },
  { label: 'Agenda', href: '/dashboard/agenda' },
  { label: 'Indicações', href: '/dashboard/indicacoes' },
  {
    label: 'Relatórios',
    children: [
      { label: 'Pacientes', href: '/dashboard/relatorios/pacientes' },
      { label: 'Indicações', href: '/dashboard/relatorios/indicacoes' },
      {
        label: 'Consolidado de Indicações',
        href: '/dashboard/relatorios/indicacoes-consolidado',
      },
      { label: 'Aniversariantes', href: '/dashboard/relatorios/aniversariantes' },
    ],
  },
  {
    label: 'Configurações',
    children: [
      { label: 'Profissionais', href: '/dashboard/configuracoes/profissionais' },
      { label: 'Horários', href: '/dashboard/configuracoes/horarios' },
    ],
  },
];

interface AppSidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function AppSidebar({ mobileOpen, onCloseMobile }: AppSidebarProps) {
  const pathname = usePathname();

  const defaultOpen = useMemo(() => {
    const labels: string[] = [];
    MENU.forEach((item) => {
      if (item.children?.some((child) => pathname.startsWith(child.href))) {
        labels.push(item.label);
      }
    });
    return labels;
  }, [pathname]);

  const [openSections, setOpenSections] = useState<string[]>(defaultOpen);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const toggleSection = (label: string) => {
    setOpenSections((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]));
  };

  return (
    <>
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`} aria-label="Menu principal">
        <div className={styles.logo}>Método Yano</div>
        <nav className={styles.nav}>
          {MENU.map((item) => {
            if (item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
                  onClick={onCloseMobile}
                >
                  {item.label}
                </Link>
              );
            }

            const opened = openSections.includes(item.label);
            const hasActiveChild = item.children?.some((child) => isActive(child.href));

            return (
              <div key={item.label} className={styles.navGroup}>
                <button
                  type="button"
                  className={`${styles.navItem} ${styles.groupButton} ${hasActiveChild ? styles.active : ''}`}
                  onClick={() => toggleSection(item.label)}
                >
                  <span>{item.label}</span>
                  <span className={`${styles.chevron} ${opened ? styles.chevronOpen : ''}`}>▾</span>
                </button>
                <div className={`${styles.submenu} ${opened ? styles.submenuOpen : ''}`}>
                  {item.children?.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={`${styles.submenuItem} ${isActive(child.href) ? styles.active : ''}`}
                      onClick={onCloseMobile}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
      <button
        type="button"
        className={`${styles.overlay} ${mobileOpen ? styles.overlayVisible : ''}`}
        aria-label="Fechar menu"
        onClick={onCloseMobile}
      />
    </>
  );
}
