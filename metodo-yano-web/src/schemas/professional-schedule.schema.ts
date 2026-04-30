import { z } from 'zod';

export const professionalScheduleSchema = z.object({
  professionalId: z.string().min(1, 'Profissional é obrigatório.'),
  weekday: z.coerce.number().min(0).max(6),
  startTime: z.string().min(1, 'Hora inicial é obrigatória.'),
  endTime: z.string().min(1, 'Hora final é obrigatória.'),
  slotDurationMinutes: z.coerce.number().int().positive('Duração do slot deve ser maior que zero.'),
  breakStartTime: z.string().optional(),
  breakEndTime: z.string().optional(),
  isActive: z.boolean().default(true),
}).refine((v) => v.endTime > v.startTime, { message: 'Hora final deve ser maior que hora inicial.', path: ['endTime'] });

export type ProfessionalScheduleFormValues = z.infer<typeof professionalScheduleSchema>;
