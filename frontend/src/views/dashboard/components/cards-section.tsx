'use client';

import { useState } from 'react';
import { DailySalesHistoryResponseElement } from '@/types/daily-sales/daily-sales-history-response';
import { IndicatorCard } from './cards/indicator-card';

interface CardsSectionProps {
  dailySalesDataHistory: DailySalesHistoryResponseElement[];
}

export function CardsSection({ dailySalesDataHistory }: CardsSectionProps) {
  const [selectedDate, setSelectedDate] = useState<string>(
    String(dailySalesDataHistory[0]?.referenceDate ?? ''),
  );

  const selected = dailySalesDataHistory.find(
    (dailyData) => String(dailyData.referenceDate) === selectedDate,
  );

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <label
          htmlFor="date-filter"
          className="font-display font-semibold text-sm sm:text-lg text-gray-700 whitespace-nowrap"
        >
          Data de referência:
        </label>
        <select
          id="date-filter"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-cyan-700 rounded-md px-3 py-1.5 text-sm font-display text-gray-700 outline-none focus:ring-2 focus:ring-cyan-700 cursor-pointer"
        >
          {dailySalesDataHistory.map((dailyData) => (
            <option
              key={String(dailyData.referenceDate)}
              value={String(dailyData.referenceDate)}
            >
              {new Date(dailyData.referenceDate).toLocaleDateString('pt-BR')}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <IndicatorCard title="Vendas (un)" value={selected?.totalOrders ?? 0} />
        <IndicatorCard
          title="Faturamento (R$)"
          value={selected?.grossRevenue ?? 0}
        />
        <IndicatorCard title="Custo (R$)" value={selected?.totalCosts ?? 0} />
        <IndicatorCard
          title="Lucro (R$)"
          value={selected?.profit ?? 0}
          isProfit
        />
      </div>
    </section>
  );
}
