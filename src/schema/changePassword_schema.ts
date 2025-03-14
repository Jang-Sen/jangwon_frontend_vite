import { z } from 'zod';

export const ChangePasswordFormSchema = z.object({
  token: z.string(),
  password: z.string().trim().min(6, '최소 6자리'),
  confirmPassword: z.string().trim(),
});

export type ChangePasswordFormType = z.infer<typeof ChangePasswordFormSchema>;

export type ChangePasswordFieldName = keyof ChangePasswordFormType;

export const ChangePasswordResponseSchema = z.object({
  token: z.string(),
  password: z.string(),
});
