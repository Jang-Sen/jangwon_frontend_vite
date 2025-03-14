import { z } from 'zod';

export const SignupFormSchema = z.object({
  username: z.string().trim().nonempty('이름을 입력해주세요.'),
  email: z
    .string()
    .email({ message: '이메일 형식을 입력해주세요.' })
    .trim()
    .nonempty('이메일을 입력해주세요.'),
  password: z
    .string()
    .trim()
    .min(6, '최소 6자리를 입력해주세요.')
    .nonempty('비밀번호를 입력해주세요.'),
  confirmPassword: z.string().nonempty('비밀번호를 다시 입력해주세요.'),
  phone: z.string().trim().nonempty('연락처를 입력해주세요.'),
  agreeOfTerm: z.object({
    overFourteen: z.boolean().refine((val) => val === true, {
      message: '14세 이상 동의는 필수입니다.',
    }),
    agreeOfTerm: z.boolean().refine((val) => val === true, {
      message: '이용약관 동의는 필수입니다.',
    }),
    agreeOfPersonalInfo: z.boolean().refine((val) => val === true, {
      message: '개인정보 동의는 필수입니다.',
    }),
    agreeOfMarketing: z.boolean().optional().default(false),
    agreeOfEvent: z.boolean().optional().default(false),
  }),
  profile: z
    .object({
      birth: z.date().nullable().optional(),
      gender: z.enum(['male', 'female', 'default']).default('default'),
      introduce: z.string().nullable().optional(),
      snsLink: z.string().url().nullable().optional(),
    })
    .default({
      birth: null,
      gender: 'default',
      introduce: null,
      snsLink: null,
    }),
});

export type SignupFormType = z.infer<typeof SignupFormSchema>;

export type SignupFieldName = keyof SignupFormType;

export const SignupApiResponseSchema = z.object({
  body: z.object({
    id: z.string().uuid(),
    username: z.string().trim(),
    email: z.string().email(),
    phone: z.string(),
    provider: z.string(),
    profile: z.object({
      birth: z.date().nullable(),
      gender: z.string().nullable(),
      introduce: z.string().nullable(),
      snsLink: z.string().nullable(),
      id: z.string().uuid(),
    }),
    agreeOfTerm: z.object({
      overFourteen: z.boolean(),
      agreeOfTerm: z.boolean(),
      agreeOfPersonalInfo: z.boolean(),
      agreeOfMarketing: z.boolean(),
      agreeOfEvent: z.boolean(),
      id: z.string().uuid(),
    }),
    profileImg: z.string(),
    createdAt: z.date(),
  }),
});
