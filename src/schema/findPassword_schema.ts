import { z } from 'zod';

export const FindPasswordFormSchema = z.object({
  email: z.string().email().trim().nonempty('이메일을 입력해주세요.'),
});

export type FindPasswordFormType = z.infer<typeof FindPasswordFormSchema>;

export type FindPasswordFieldName = keyof FindPasswordFormType;

export const FindPasswordResponseSchema = z.object({
  email: z.string().email(),
});
