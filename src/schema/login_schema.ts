import { z } from 'zod';

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'email is required')
    .trim()
    .email({ message: 'invalid Email' })
    .toLowerCase(),
  password: z.string().trim().min(6, {
    message: '최소 6자리',
  }),
});

export type LoginFormType = z.infer<typeof LoginFormSchema>;

export type LoginFieldName = keyof LoginFormType;

export const LoginApiResponseSchema = z.object({
  user: z.object({
    id: z.string(),
    createdAt: z.string(),
    username: z.string(),
    email: z.string().email(),
    phone: z.string(),
    profileImg: z.string().url(),
    provider: z.string(),
    profile: z.object({
      id: z.string(),
      birth: z.string(),
      gender: z.string(),
      introduce: z.string(),
      snsLink: z.string().url(),
    }),
    agreeOfTerm: z.object({
      id: z.string(),
      overFourteen: z.boolean(),
      agreeOfTerm: z.boolean(),
      agreeOfPersonalInfo: z.boolean(),
      agreeOfMarketing: z.boolean(),
      agreeOfEvent: z.boolean(),
    }),
  }),
  accessToken: z.string(),
});
