import { env } from '@/env/index';
import type { TokenPayload } from '@/types/auth/token-payload';
import { AppError } from '@/utils/app-error';
import { type Response, type Request, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const token = req.cookies.token;
  if (!token) throw new AppError('Credenciais inválidas.', 401);

  try {
    const decodedToken = jwt.verify(token, env.SECRET_KEY) as TokenPayload;
    req.authUser = decodedToken;
    next();
  } catch {
    throw new AppError('Credenciais inválidas.', 401);
  }
}
