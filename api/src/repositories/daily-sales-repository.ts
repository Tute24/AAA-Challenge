import { DailySaleRepoType } from '@/types/daily-sales/daily-sales-type';

export interface DailySalesRepository {
  getDailySalesHistory(): Promise<DailySaleRepoType[]>;
}
