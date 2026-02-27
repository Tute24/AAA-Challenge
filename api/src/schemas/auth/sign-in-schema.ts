import z from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Endereço de e-mail inválido.' }),
  password: z.string().min(1, { message: 'A senha é obrigatória.' }), //aqui não faz sentido a validação das regras de senha, pois é o service que vai validar se a senha tá correta ou não.
});
