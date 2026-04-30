import { z } from 'zod';

export const referralSchema = z.object({
  name: z.string().min(1, 'Indicação é obrigatória').max(255, 'Máximo de 255 caracteres'),
});

export type ReferralFormValues = z.infer<typeof referralSchema>;
