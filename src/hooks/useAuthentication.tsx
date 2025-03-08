import {useMutation} from "@tanstack/react-query";
import {z} from "zod";
import {LoginApiResponseSchema, LoginFormType} from "../schema/login_schema.tsx";
import axios, {AxiosError} from "axios";
import {useNavigate} from "react-router-dom";
import {useUserStore} from "../store/user-store.ts";

interface ErrorResponse {
    message: string
}

export function useLogin() {
    const navigate = useNavigate();
    const {setCredentials} = useUserStore()

    return useMutation<
        z.infer<typeof LoginApiResponseSchema>,
        AxiosError<ErrorResponse>,
        LoginFormType
    >({
        mutationFn: async (userInput: { email: string, password: string }) => {
            const {data} = await axios.post('http://localhost/api/v1/auth/login', userInput);

            console.log('UserInput Data', data);

            const parsedData = LoginApiResponseSchema.safeParse(data);
            console.log(parsedData);

            if (!parsedData.success) {
                return;
            }
            const {accessToken, user} = parsedData.data;
            setCredentials({
                accessToken,
                user,
            });

            return data;
        },
        onSuccess: (data) => {
            console.log('********************', data);
            navigate('/profile');
        },
        onError: (error) => {
            console.error(error.response?.data.message);
        }
    })
}