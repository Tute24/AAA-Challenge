import { SignInDTO } from '@/dtos/sign-in-dto';
import { apiClient } from '@/utils/api-client';
import axios from 'axios';

type SignInResult =
  | { success: true; username: string }
  | { success: false; message: string };

export async function signInRequest(data: SignInDTO): Promise<SignInResult> {
  try {
    const response = await apiClient({
      httpMethod: 'post',
      route: '/auth/sign-in',
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
