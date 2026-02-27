import express, { type Router } from 'express';
import { asyncHandler } from '@/utils/async-handler';
import { getDailySalesHistoryController } from '@/controllers/daily-sales/get-daily-sales-history';
import authMiddleware from '@/middlewares/auth-middleware';
import { getLastDayProfitController } from '@/controllers/daily-sales/get-last-day-profit';

export const dailySalesRouter: Router = express.Router();

dailySalesRouter.get(
  '/',
  authMiddleware,
  asyncHandler(getDailySalesHistoryController),
);
dailySalesRouter.get('/profit-alert', asyncHandler(getLastDayProfitController));
