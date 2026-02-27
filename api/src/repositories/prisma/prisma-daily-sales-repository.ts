import prisma from '@/lib/prisma';
import { DailySalesRepository } from '../daily-sales-repository';

export class PrismaDailySalesRepository implements DailySalesRepository {
  async getDailySalesHistory() {
    const dailySales = await prisma.dailySale.findMany({
      orderBy: { referenceDate: 'desc' },
      select: {
        referenceDate: true,
        totalOrders: true,
        grossRevenue: true,
        totalCosts: true,
      },
    });

    return dailySales;
  }

  async getLastDayData(yesterday: Date, today: Date) {
    const lastDayData = await prisma.dailySale.findFirst({
      where: {
        referenceDate: {
          gte: yesterday,
          lt: today,
        },
      },
      select: {
        referenceDate: true,
        totalOrders: true,
        grossRevenue: true,
        totalCosts: true,
      },
    });

    return lastDayData;
  }
}
