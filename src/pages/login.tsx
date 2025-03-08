import React from 'react';
import {useLogin} from "../hooks/useAuthentication.tsx";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {LoginFormSchema, LoginFormType} from "../schema/login_schema.tsx";
import {zodResolver} from "@hookform/resolvers/zod";

const Login: React.FC = () => {
    const methods = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
    });

    const {register, handleSubmit, formState: {errors}} = methods

    const {mutate: loginMutation} = useLogin();


    const loginHandler: SubmitHandler<LoginFormType> = (data) => {
        console.log(data);
        loginMutation(data);
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(loginHandler)}>
                <input
                    type="email"
                    placeholder='email'
                    {...register('email')}
                />
                {errors.email && <span>{errors.email.message}</span>}

                <input
                    type='password'
                    placeholder={'password'}
                    {...register('password')}

                />

                <button type={'submit'}>
                    login
                </button>
            </form>
        </FormProvider>
    );
};

export default Login;