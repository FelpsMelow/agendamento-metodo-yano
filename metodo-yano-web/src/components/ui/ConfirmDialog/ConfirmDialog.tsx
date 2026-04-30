import styles from './ConfirmDialog.module.scss';

interface ConfirmDialogProps {
  message?: string;
}

export function ConfirmDialog({ message = 'Tem certeza que deseja continuar?' }: ConfirmDialogProps) {
  return <div className={styles.placeholder}>{message}</div>;
}
