interface IndicatorCardProps {
  title: string;
  value: number;
  isProfit?: boolean;
}

export function IndicatorCard({
  title,
  value,
  isProfit = false,
}: IndicatorCardProps) {
  const valueColor = isProfit
    ? value >= 0
      ? 'text-green-600'
      : 'text-red-500'
    : 'text-cyan-700';

  return (
    <div className="relative bg-white border border-cyan-700 rounded-xl p-5 flex flex-col gap-2 shadow-sm text-center">
      <span className="font-display font-semibold text-sm sm:text-lg mb-4 text-gray-700">
        {title}
      </span>
      <span
        className={`absolute font-display font-bold text-2xl ${valueColor} bottom-0 left-1/2 transform -translate-x-1/2`}
      >
        {value.toLocaleString('pt-BR')}
      </span>
    </div>
  );
}
