'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  LabelList,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

interface ProfitChartData {
  referenceDate: Date;
  profit: number;
}

interface ProfitChartProps {
  data: ProfitChartData[];
}

export function ProfitChart({ data }: ProfitChartProps) {
  const formatted = data.map((dailyData) => ({
    date: new Date(dailyData.referenceDate).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    }),
    profit: dailyData.profit,
  }));

  const minProfit = Math.min(0, ...formatted.map((e) => e.profit));
  const maxProfit = Math.max(0, ...formatted.map((e) => e.profit));

  return (
    <div className="bg-white border border-cyan-700 rounded-xl shadow-sm flex flex-col overflow-hidden">
      <div className="px-5 py-3 border-b border-cyan-700">
        <span className="font-display font-semibold text-sm text-black">
          Lucro por dia (R$)
        </span>
      </div>
      <div className="overflow-x-auto px-4 py-6">
        <div
          style={{ minWidth: `${formatted.length * 64}px`, height: '280px' }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formatted}
              margin={{ top: 24, right: 24, left: 8, bottom: 8 }}
            >
              <XAxis
                dataKey="date"
                tick={{
                  fontSize: 11,
                  fill: '#000',
                  fontFamily: 'var(--font-poppins)',
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{
                  fontSize: 11,
                  fill: '#000',
                  fontFamily: 'var(--font-poppins)',
                }}
                axisLine={{ stroke: '#000' }}
                tickLine={false}
                width={60}
                domain={[minProfit, maxProfit]}
              />
              <ReferenceLine y={0} stroke="#000" strokeWidth={1} />
              <Tooltip
                contentStyle={{
                  fontFamily: 'var(--font-poppins)',
                  fontSize: 12,
                  borderColor: '#0e7490',
                  borderRadius: 8,
                }}
                formatter={(value) => [value, 'Lucro (R$)']}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#0e7490"
                strokeWidth={2}
                dot={{ r: 4, fill: '#0e7490', strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  dataKey="profit"
                  position="top"
                  style={{
                    fontSize: 10,
                    fill: '#0e7490',
                    fontFamily: 'var(--font-poppins)',
                    fontWeight: 600,
                  }}
                />
              </Line>
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
