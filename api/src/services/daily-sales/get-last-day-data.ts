import { DailySalesRepository } from '@/repositories/daily-sales-repository';
import { DailySaleRepoType } from '@/types/daily-sales/daily-sales-type';

export class GetLastDayProfitService {
  constructor(private dailySalesRepository: DailySalesRepository) {}

  async execute(): Promise<{
    lastDayData: (DailySaleRepoType & { profit: number }) | null;
    alertSituation: string | null;
  }> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setUTCDate(today.getUTCDate() - 1);

    const lastDayData = await this.dailySalesRepository.getLastDayData(
      yesterday,
      today,
    );

    if (lastDayData) {
      const profit = lastDayData.grossRevenue - lastDayData.totalCosts;
      const lastDayDataWithProfit = {
        ...lastDayData,
        profit,
      };

      const alertSituation = profit < 0 ? 'perda' : 'lucro';
      return { lastDayData: lastDayDataWithProfit, alertSituation };
    }

    return { lastDayData: null, alertSituation: null };
  }
}
