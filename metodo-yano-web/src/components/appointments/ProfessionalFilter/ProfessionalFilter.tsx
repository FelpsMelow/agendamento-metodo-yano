import styles from './ProfessionalFilter.module.scss';
interface Props { value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; }
export function ProfessionalFilter({ value, onChange, options }: Props) { return <label className={styles.wrapper}>Profissional<select value={value} onChange={(e)=>onChange(e.target.value)}>{options.map((o)=><option key={o.value} value={o.value}>{o.label}</option>)}</select></label>; }
