import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { ValidateService } from '@/services/auth/validate';
import type { Request, Response } from 'express';

export async function validateController(req: Request, res: Response) {
  const authRepository = new PrismaAuthRepository();
  const validateService = new ValidateService(authRepository);

  await validateService.execute({ id: req.authUser?.id ?? '' });

  res.status(200).end();
}
