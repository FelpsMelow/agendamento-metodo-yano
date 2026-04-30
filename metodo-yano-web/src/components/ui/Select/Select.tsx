import styles from './Select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, children, ...props }: SelectProps) {
  return (
    <label className={styles.wrapper}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <select className={styles.select} {...props}>
        {children}
      </select>
    </label>
  );
}
