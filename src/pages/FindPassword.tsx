import React from 'react';
import { useFindPassword } from '../hooks/useResetPassword.ts';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import {
  FindPasswordFormSchema,
  FindPasswordFormType,
} from '../schema/findPassword_schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';

const FindPassword: React.FC = () => {
  const method = useForm<FindPasswordFormType>({
    resolver: zodResolver(FindPasswordFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;

  const { mutate: findPasswordMutation } = useFindPassword();

  const findPasswordHandler: SubmitHandler<FindPasswordFormType> = (data) => {
    console.log('Find password handler data', data);
    findPasswordMutation(data);
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(findPasswordHandler)}>
        <input type="email" placeholder="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}

        <button type="submit">find email</button>
      </form>
    </FormProvider>
  );
};

export default FindPassword;
