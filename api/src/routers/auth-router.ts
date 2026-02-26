import { signInController } from '@/controllers/auth/sign-in';
import { signUpController } from '@/controllers/auth/sign-up';
import { validateController } from '@/controllers/auth/validate';
import authMiddleware from '@/middlewares/auth-middleware';
import { asyncHandler } from '@/utils/async-handler';
import express, { type Router } from 'express';

export const authRouter: Router = express.Router();

authRouter.post('/sign-up', asyncHandler(signUpController));
authRouter.post('/sign-in', asyncHandler(signInController));
authRouter.get('/validate', authMiddleware, asyncHandler(validateController));
