import styles from './PeriodFilter.module.scss';
interface Props { start: string; end: string; onChange: (k:'start'|'end', v:string)=>void; onFilter: ()=>void; }
export function PeriodFilter({start,end,onChange,onFilter}:Props){return <div className={styles.row}><label>Período inicial<input type='date' value={start} onChange={(e)=>onChange('start',e.target.value)}/></label><label>Período final<input type='date' value={end} onChange={(e)=>onChange('end',e.target.value)}/></label><button onClick={onFilter}>Filtrar</button></div>}
