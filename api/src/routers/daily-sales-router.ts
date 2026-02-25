import express, { type Router } from 'express';
import { asyncHandler } from '@/utils/async-handler';
import { getDailySalesHistoryController } from '@/controllers/daily-sales/get-daily-sales-history';
import authMiddleware from '@/middlewares/auth-middleware';

export const dailySalesRouter: Router = express.Router();

dailySalesRouter.get(
  '/',
  authMiddleware,
  asyncHandler(getDailySalesHistoryController),
);
