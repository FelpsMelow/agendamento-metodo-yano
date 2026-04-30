import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().trim().email('Informe um e-mail válido.'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

export type AuthSchema = z.infer<typeof authSchema>;
