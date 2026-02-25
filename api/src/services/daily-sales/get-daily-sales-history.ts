import { GetDailySalesHistoryDTO } from '@/dtos/daily-sales/get-daily-sales-history-dto';
import { AuthRepository } from '@/repositories/auth-repository';
import { DailySalesRepository } from '@/repositories/daily-sales-repository';
import { DailySaleFormatted } from '@/types/daily-sales/daily-sales-history-reponse';
import { AppError } from '@/utils/app-error';

export class GetDailySalesHistory {
  constructor(
    private authRepository: AuthRepository,
    private dailySalesRepository: DailySalesRepository,
  ) {}

  async execute(
    data: GetDailySalesHistoryDTO,
  ): Promise<{ dailySalesFormattedHistory: DailySaleFormatted[] }> {
    const user = await this.authRepository.findUserById(data.userId);
    if (!user) throw new AppError('Usuário não encontrado.', 404);

    const dailySalesHistory =
      await this.dailySalesRepository.getDailySalesHistory();

    const dailySalesFormattedHistory = dailySalesHistory.map((dailySale) => ({
      referenceDate: dailySale.referenceDate,
      totalOrders: dailySale.totalOrders,
      grossRevenue: dailySale.grossRevenue,
      totalCosts: dailySale.totalCosts,
      profit: dailySale.grossRevenue - dailySale.totalCosts, //calcula o lucro ao subtrair o faturamento bruto dos 'custos operacionais' - regra de negócio, por isso no service e importante para dash no FE
    }));

    return { dailySalesFormattedHistory };
  }
}
