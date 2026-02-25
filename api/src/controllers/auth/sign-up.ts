import { env } from '@/env';
import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { signUpSchema } from '@/schemas/auth/sign-up-schema';
import { SignUpService } from '@/services/auth/sign-up';
import type { Request, Response } from 'express';

export async function signUpController(req: Request, res: Response) {
  const { email, name, password } = signUpSchema.parse(req.body);

  const authRepository = new PrismaAuthRepository();
  const signUpService = new SignUpService(authRepository);

  const { username, token } = await signUpService.execute({
    email,
    name,
    password,
  });

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production', //enquanto não estiver em produção, o cookie pode ser enviado em conexões não seguras (http)
      sameSite: 'lax', //permite o cookie ser enviado em requisições de outros sites (para desenvolvimento é ok)
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 dia de validade para o cookie
    })
    .status(201)
    .json({ username });
}
