import styles from './AppointmentStatusBadge.module.scss';
export function AppointmentStatusBadge({status}:{status:string}){return <span className={`${styles.badge} ${styles[status]||''}`}>{status}</span>}
