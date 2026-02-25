import { DailySalesHistoryResponseElement } from '@/types/daily-sales/daily-sales-history-response';
import { CardsSection } from './cards-section';

interface DashboardViewProps {
  dailySalesDataHistory: DailySalesHistoryResponseElement[];
}

export function DashboardView({ dailySalesDataHistory }: DashboardViewProps) {
  return (
    <main className="px-6 sm:px-10 py-8 flex flex-col gap-10">
      <CardsSection dailySalesDataHistory={dailySalesDataHistory} />
    </main>
  );
}
