import { DailySaleRepoType } from '@/types/daily-sales/daily-sales-type';

export interface DailySalesRepository {
  getDailySalesHistory(): Promise<DailySaleRepoType[]>;
  getLastDayData(
    yesterday: Date,
    today: Date,
  ): Promise<DailySaleRepoType | null>;
}
