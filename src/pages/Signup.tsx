import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { SignupFormSchema, SignupFormType } from '../schema/signup_schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '../hooks/useAuthentication.ts';

const Signup: React.FC = () => {
  const methods = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      agreeOfTerm: {
        overFourteen: false,
        agreeOfTerm: false,
        agreeOfPersonalInfo: false,
        agreeOfMarketing: false,
        agreeOfEvent: false,
      },
      profile: {
        birth: null,
        gender: 'default',
        introduce: null,
        snsLink: null,
      },
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate: signupMutation } = useSignup();

  const signupHandler: SubmitHandler<SignupFormType> = (data) => {
    console.log('회원가입 요청 데이터: ', data);
    signupMutation(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(signupHandler)}>
        <input type="text" placeholder="이름" {...register('username')} />
        {errors.username && <span>{errors.username.message}</span>}

        <input type="email" placeholder="이메일" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}

        <input
          type="password"
          placeholder="비밀번호"
          {...register('password')}
        />
        {errors.password && <span>{errors.password.message}</span>}

        <input
          type="password"
          placeholder="비밀번호 확인"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span>{errors.confirmPassword.message}</span>
        )}

        <input type="text" placeholder="연락처" {...register('phone')} />
        {errors.phone && <span>{errors.phone.message}</span>}

        {/* 약관 동의 체크 */}
        <label>
          <input type="checkbox" {...register('agreeOfTerm.overFourteen')} />
          14세 이상입니다.
        </label>
        {errors.agreeOfTerm?.overFourteen && (
          <span>{errors.agreeOfTerm.overFourteen.message}</span>
        )}

        <label>
          <input type="checkbox" {...register('agreeOfTerm.agreeOfTerm')} />
          이용약관에 동의합니다.
        </label>
        {errors.agreeOfTerm?.agreeOfTerm && (
          <span>{errors.agreeOfTerm.agreeOfTerm.message}</span>
        )}

        <label>
          <input
            type="checkbox"
            {...register('agreeOfTerm.agreeOfPersonalInfo')}
          />
          개인정보 수집에 동의합니다.
        </label>
        {errors.agreeOfTerm?.agreeOfPersonalInfo && (
          <span>{errors.agreeOfTerm.agreeOfPersonalInfo.message}</span>
        )}

        <label>
          <input
            type="checkbox"
            {...register('agreeOfTerm.agreeOfMarketing')}
          />
          마케팅 수신 동의 (선택)
        </label>

        <label>
          <input type="checkbox" {...register('agreeOfTerm.agreeOfEvent')} />
          이벤트 정보 수신 동의 (선택)
        </label>

        <button type="submit">회원가입</button>
      </form>
    </FormProvider>
  );
};

export default Signup;
