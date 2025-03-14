import { useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import {
  LoginApiResponseSchema,
  LoginFormType,
} from '../schema/login_schema.ts';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/user-store.ts';
import {
  SignupApiResponseSchema,
  SignupFormType,
} from '../schema/signup_schema.ts';

interface ErrorResponse {
  message: string;
}

export function useLogin() {
  const navigate = useNavigate();
  const { setCredentials } = useUserStore();

  return useMutation<
    z.infer<typeof LoginApiResponseSchema>,
    AxiosError<ErrorResponse>,
    LoginFormType
  >({
    mutationFn: async (userInput: { email: string; password: string }) => {
      const { data } = await axios.post(
        'http://localhost/api/v1/auth/login',
        userInput
      );

      console.log('UserInput Data', data);

      const parsedData = LoginApiResponseSchema.safeParse(data);
      console.log(parsedData);

      if (!parsedData.success) {
        return;
      }
      const darkMode: boolean = true;

      const { accessToken } = parsedData.data;

      localStorage.setItem('token', accessToken);

      setCredentials({
        accessToken,
        darkMode,
      });

      return data;
    },
    onSuccess: (data) => {
      console.log('********************', data);
      navigate('/profile');
    },
    onError: (error) => {
      console.error(error.response?.data.message);
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();

  const { removeCredentials } = useUserStore();

  removeCredentials();

  navigate('/login');
}

export function useSignup() {
  // const { setCredentials } = useUserStore();

  return useMutation<
    z.infer<typeof SignupApiResponseSchema>,
    AxiosError<ErrorResponse>,
    SignupFormType
  >({
    mutationFn: async (userInput) => {
      const { data } = await axios.post(
        'http://localhost/api/v1/auth/signup',
        userInput
      );

      console.log('Signup Data: ', data);

      const parseData = SignupApiResponseSchema.safeParse(data);

      if (!parseData.success) {
        return;
      }

      // const { body } = parseData.data;
      // setCredentials({ body });

      return data;
    },
    onSuccess: () => {
      alert('회원가입 성공');
    },
    onError: (error) => {
      console.error('Signup Error: ', error.response?.data.message);
    },
  });
}

export function useGetProfile() {
  const token = localStorage.getItem('token');

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const config = {
          headers: {
            Authentication: 'Bearer ' + token,
          },
        };

        const { data } = await axios.get(
          'http://localhost/api/v1/auth',
          config
        );

        console.log('profile data', data);

        return data;
      } catch (e) {
        console.error(e);
      }
    },
  });
}
