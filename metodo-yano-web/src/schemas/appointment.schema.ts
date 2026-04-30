import { z } from 'zod';
export const appointmentFormSchema = z.object({ patientId: z.string().min(1,'Paciente é obrigatório'), professionalId: z.string().min(1,'Profissional é obrigatório'), date: z.string().min(1,'Data é obrigatória'), startTime: z.string().min(1,'Hora inicial obrigatória'), endTime: z.string().min(1,'Hora final obrigatória'), status: z.enum(['scheduled','confirmed','completed','cancelled','no_show']).default('scheduled'), notes: z.string().optional() });
export type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;
