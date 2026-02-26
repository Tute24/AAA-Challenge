import z from 'zod';
import { passwordSchema } from './password-schema';

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
    email: z.email({ message: 'Endereço de e-mail inválido.' }),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });
