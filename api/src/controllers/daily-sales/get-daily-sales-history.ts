import { PrismaAuthRepository } from '@/repositories/prisma/prisma-auth-repository';
import { PrismaDailySalesRepository } from '@/repositories/prisma/prisma-daily-sales-repository';
import { GetDailySalesHistory } from '@/services/daily-sales/get-daily-sales-history';
import type { Request, Response } from 'express';

export async function getDailySalesHistoryController(
  req: Request,
  res: Response,
) {
  const authRepository = new PrismaAuthRepository();
  const dailySalesRepository = new PrismaDailySalesRepository();
  const getDailySalesHistoryService = new GetDailySalesHistory(
    authRepository,
    dailySalesRepository,
  );

  const { dailySalesFormattedHistory } =
    await getDailySalesHistoryService.execute({
      userId: req.authUser?.id ?? '',
    });

  res.status(200).json({ dailySalesFormattedHistory });
}
