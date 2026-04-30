import { z } from 'zod';

export const patientSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido').optional().or(z.literal('')),
  profession: z.string().optional(),
  cpf: z.string().optional(),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
  mobile1: z.string().optional(),
  mobile2: z.string().optional(),
  scapularWaist: z.string().optional(),
  pelvicWaist: z.string().optional(),
  packageSessions: z.coerce.number().optional(),
});

export type PatientFormValues = z.infer<typeof patientSchema>;
