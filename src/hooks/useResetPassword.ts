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
