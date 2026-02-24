import { signUpSchema } from '@/schemas/auth/sign-up-schema';
import z from 'zod';

export type CreateUserDTO = Omit<
  z.infer<typeof signUpSchema>,
  'confirmPassword'
>;
