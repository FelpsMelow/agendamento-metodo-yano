import styles from './Textarea.module.scss';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function Textarea({ label, ...props }: TextareaProps) {
  return (
    <label className={styles.wrapper}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <textarea className={styles.textarea} {...props} />
    </label>
  );
}
