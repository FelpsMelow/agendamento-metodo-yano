'use client';
import { Drawer } from '@/components/ui/Drawer'; import { AppointmentForm } from '../AppointmentForm'; import { AppointmentFormValues } from '@/schemas/appointment.schema';
export function AppointmentDrawer({open,onClose,initialValues,onSubmit}:{open:boolean;onClose:()=>void;initialValues:AppointmentFormValues;onSubmit:(v:AppointmentFormValues)=>void}){return <Drawer isOpen={open} onClose={onClose} title='Atendimento'><AppointmentForm initialValues={initialValues} onSubmit={onSubmit}/></Drawer>}
