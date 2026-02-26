import { PrismaDailySalesRepository } from '@/repositories/prisma/prisma-daily-sales-repository';
import { GetLastDayProfitService } from '@/services/daily-sales/get-last-day-data';
import type { Request, Response } from 'express';

export async function getLastDayProfitController(_req: Request, res: Response) {
  const dailySalesRepository = new PrismaDailySalesRepository();
  const getLastDayProfitService = new GetLastDayProfitService(
    dailySalesRepository,
  );

  const { lastDayData, alertSituation } =
    await getLastDayProfitService.execute();

  res.status(200).json({ lastDayData, alertSituation });
}
