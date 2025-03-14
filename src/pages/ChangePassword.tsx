import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { ChangePasswordFormType } from '../schema/changePassword_schema.ts';
import { useChangePassword } from '../hooks/useResetPassword.ts';
import { useSearchParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ChangePassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token: string = searchParams.get('token');
  console.log('params@@@@@@@@@@@@@@@', token);

  const method = useForm<ChangePasswordFormType>({
    // resolver: zodResolver(ChangePasswordFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = method;

  const { mutate } = useChangePassword(token);

  const changePasswordHandler: SubmitHandler<ChangePasswordFormType> = (
    data
  ) => {
    console.log('Handler data', data);

    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      return alert('Password Do Not Matched');
    }

    const userInput = {
      token,
      password,
    };

    console.log('#############################', userInput);
    // const { password, confirmPassword } = data;

    mutate(userInput);
  };

  return (
    <FormProvider {...method}>
      <form onSubmit={handleSubmit(changePasswordHandler)}>
        <input
          type="password"
          placeholder="password"
          {...register('password')}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <input
          type="password"
          placeholder="confirmPassword"
          {...register('confirmPassword')}
        />
        <Button variant="primary" type="submit">
          비밀번호 변경
        </Button>
      </form>
    </FormProvider>
  );
};

export default ChangePassword;
