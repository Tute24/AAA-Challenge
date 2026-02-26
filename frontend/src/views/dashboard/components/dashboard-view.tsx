import { DailySalesHistoryResponseElement } from '@/types/daily-sales/daily-sales-history-response';
import { CardsSection } from './cards-section';
import { IndicatorTable } from './tables/indicator-table';
import { ProfitChart } from './charts/profit-chart';

interface DashboardViewProps {
  dailySalesDataHistory: DailySalesHistoryResponseElement[];
}

export function DashboardView({ dailySalesDataHistory }: DashboardViewProps) {
  const mappedDatesAndOrders = dailySalesDataHistory.map((dailyData) => ({
    referenceDate: dailyData.referenceDate,
    totalOrders: dailyData.totalOrders,
  }));
  const mappedDatesAndRevenue = dailySalesDataHistory.map((dailyData) => ({
    referenceDate: dailyData.referenceDate,
    grossRevenue: dailyData.grossRevenue,
  }));
  const mappedDatesAndCosts = dailySalesDataHistory.map((dailyData) => ({
    referenceDate: dailyData.referenceDate,
    totalCosts: dailyData.totalCosts,
  }));
  const mappedDatesAndProfits = dailySalesDataHistory.map((dailyData) => ({
    referenceDate: dailyData.referenceDate,
    profit: dailyData.profit,
  }));

  return (
    <main className="px-6 sm:px-10 py-8 flex flex-col gap-10">
      <CardsSection dailySalesDataHistory={dailySalesDataHistory} />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <IndicatorTable
          indicatorHistoryData={mappedDatesAndOrders}
          indicatorTitle="Vendas (un)"
          indicatorKey="totalOrders"
        />
        <IndicatorTable
          indicatorHistoryData={mappedDatesAndRevenue}
          indicatorTitle="Faturamento Bruto (R$)"
          indicatorKey="grossRevenue"
        />
        <IndicatorTable
          indicatorHistoryData={mappedDatesAndCosts}
          indicatorTitle="Custo Operacional (R$)"
          indicatorKey="totalCosts"
        />
      </section>

      <ProfitChart data={mappedDatesAndProfits} />
    </main>
  );
}
