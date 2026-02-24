import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { signUpSchema } from '@/schemas/auth/sign-up-schema';
import { SignUpService } from '@/services/auth/sign-up';
import type { Request, Response } from 'express';

export async function signUpController(req: Request, res: Response) {
  const { email, name, password } = signUpSchema.parse(req.body);

  const authRepository = new PrismaAuthRepository();
  const signUpService = new SignUpService(authRepository);

  const { username } = await signUpService.execute({ email, name, password });

  res.status(201).json({ username });
}
