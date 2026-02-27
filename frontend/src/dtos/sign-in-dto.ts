import { signInSchema } from '@/schemas/sign-in-schema';
import z from 'zod';

export type SignInDTO = z.infer<typeof signInSchema>;
