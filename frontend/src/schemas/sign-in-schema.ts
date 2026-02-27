import z from 'zod';

export const signInSchema = z.object({
  email: z.email({ message: 'Endereço de e-mail inválido.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }),
});
