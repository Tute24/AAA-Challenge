import { signUpSchema } from '@/schemas/sign-up-schema';
import z from 'zod';

export type SignUpDTO = z.infer<typeof signUpSchema>;
