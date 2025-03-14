import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function useFindPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (input: { email: string }) => {
      const { data } = await axios.post(
        'http://localhost/api/v1/auth/find/password',
        input
      );
      console.log('Data', data);

      return data;
    },
    onSuccess: () => {
      navigate('/login');
    },
    onError: () => {},
  });
}

export function useChangePassword(token: string) {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (input: { password: string }) => {
      try {
        const { data } = await axios.post(
          `http://localhost/api/v1/auth/change/password`,
          { token, password: input.password }
        );

        console.log('Change Data', data);

        return data;
      } catch (e) {
        console.error(e);
      }
    },
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.error('Error: ', error);
    },
  });
}
