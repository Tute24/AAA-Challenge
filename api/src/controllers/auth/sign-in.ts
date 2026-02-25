import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { signInSchema } from '@/schemas/auth/sign-in-schema';
import { SignInService } from '@/services/auth/sign-in';
import type { Request, Response } from 'express';

export async function signInController(req: Request, res: Response) {
  const { email, password } = signInSchema.parse(req.body);

  const authRepository = new PrismaAuthRepository();
  const signInService = new SignInService(authRepository);

  const { username, token } = await signInService.execute({ email, password });

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', //enquanto não estiver em produção, o cookie pode ser enviado em conexões não seguras (http)
      sameSite: 'lax', //permite o cookie ser enviado em requisições de outros sites (para desenvolvimento é ok, em produção pode ser ajustado para melhorar segurança dependendo do objetivo da aplicação (com 'strict'))
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 dia de validade para o cookie
    })
    .status(200)
    .json({ username });
}
