'use client';
import { useMemo, useState } from 'react';
import { format, addDays } from 'date-fns';
import { PageHeader } from '@/components/layout/PageHeader';
import { CalendarView } from '@/components/appointments/CalendarView';
import { ProfessionalFilter } from '@/components/appointments/ProfessionalFilter';
import { PeriodFilter } from '@/components/appointments/PeriodFilter';
import { AppointmentDrawer } from '@/components/appointments/AppointmentDrawer';
import { appointmentsClient } from '@/services/appointments.client';
import { AppointmentFormValues } from '@/schemas/appointment.schema';
import styles from './page.module.scss';

export default function AgendaPage(){
const [professionalId,setProfessionalId]=useState(''); const [start,setStart]=useState(format(new Date(),'yyyy-MM-dd')); const [end,setEnd]=useState(format(addDays(new Date(),7),'yyyy-MM-dd')); const [events,setEvents]=useState<any[]>([]); const [open,setOpen]=useState(false); const [currentId,setCurrentId]=useState<string|undefined>(); const [initialValues,setInitialValues]=useState<AppointmentFormValues>({patientId:'',professionalId:'',date:start,startTime:'08:00',endTime:'08:30',status:'scheduled',notes:''});
const professionals = useMemo(()=>[{value:'',label:'André Yano'}],[]);
const load=async()=>{ if(!professionalId)return; setEvents(await appointmentsClient.events(professionalId,new Date(start).toISOString(),new Date(end).toISOString())); };
const onSubmit=async(values:AppointmentFormValues)=>{ const startAt=`${values.date}T${values.startTime}:00`; const endAt=`${values.date}T${values.endTime}:00`; const payload={...values,startAt,endAt,date:values.date}; if(currentId) await appointmentsClient.update(currentId,payload); else await appointmentsClient.create(payload); setOpen(false); await load(); };
return <div className={styles.page}><PageHeader title='Agenda' subtitle='Agenda por profissional e período.'/><div className={styles.filters}><ProfessionalFilter value={professionalId} onChange={setProfessionalId} options={professionals}/><PeriodFilter start={start} end={end} onChange={(k,v)=>k==='start'?setStart(v):setEnd(v)} onFilter={load}/></div><p className={styles.helper}>Clique no dia desejado para marcar uma consulta.</p><CalendarView events={events} onDateClick={(arg)=>{setCurrentId(undefined);setInitialValues({...initialValues, professionalId,date:arg.dateStr.slice(0,10),startTime:arg.dateStr.slice(11,16),endTime:arg.dateStr.slice(11,16)});setOpen(true);}} onEventClick={async(arg)=>{const a:any=await appointmentsClient.getById(arg.event.id);setCurrentId(a._id);setInitialValues({patientId:a.patientId,professionalId:a.professionalId,date:a.date.slice(0,10),startTime:a.startTime,endTime:a.endTime,status:a.status,notes:a.notes||''});setOpen(true);}}/><AppointmentDrawer open={open} onClose={()=>setOpen(false)} initialValues={initialValues} onSubmit={onSubmit}/></div>
}
