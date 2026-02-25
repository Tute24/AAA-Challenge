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
}
