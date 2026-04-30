import { z } from 'zod';

export const professionalSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório.'),
  email: z.string().email('E-mail inválido.'),
  role: z.enum(['admin', 'professional', 'receptionist']),
  isProfessional: z.boolean(),
  isActive: z.boolean(),
  password: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.password || data.password.length < 8) {
    ctx.addIssue({ code: 'custom', message: 'Senha deve ter ao menos 8 caracteres.', path: ['password'] });
  }
});

export type ProfessionalFormValues = z.infer<typeof professionalSchema>;
