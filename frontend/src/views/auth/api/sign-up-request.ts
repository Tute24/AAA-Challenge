import { SignUpDTO } from '@/dtos/sign-up-dto';
import { apiClient } from '@/utils/api-client';
import axios from 'axios';

type SignUpResult =
  | { success: true; username: string }
  | { success: false; message: string };

export async function signUpRequest(data: SignUpDTO): Promise<SignUpResult> {
  try {
    const response = await apiClient({
      httpMethod: 'post',
      route: '/auth/sign-up',
      data,
    });

    const { username } = response.data as { username: string };
    return { success: true, username };
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      return { success: false, message: err.response.data.message };
    }
    return { success: false, message: 'Algo deu errado, tente novamente.' };
  }
}
