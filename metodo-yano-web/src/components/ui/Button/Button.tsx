import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

export function Button({ label, children, className, ...props }: ButtonProps) {
  return (
    <button className={[styles.button, className].filter(Boolean).join(' ')} {...props}>
      {children ?? label}
    </button>
  );
}
