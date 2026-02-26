interface IndicatorTableProps<K extends string> {
  indicatorHistoryData: ({ referenceDate: Date } & Record<K, number>)[];
  indicatorTitle: string;
  indicatorKey: K;
}

export function IndicatorTable<K extends string>({
  indicatorHistoryData,
  indicatorTitle,
  indicatorKey,
}: IndicatorTableProps<K>) {
  return (
    <div className="bg-white border border-cyan-700 rounded-xl shadow-sm flex flex-col overflow-hidden">
      <div className="px-5 py-3 border-b border-cyan-700">
        <span className="font-display font-semibold text-sm text-black">
          {indicatorTitle}
        </span>
      </div>
      <div className="overflow-y-auto h-72">
        <table className="w-full text-sm font-display">
          <thead className="sticky top-0 bg-white border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-black">
                Data
              </th>
              <th className="px-4 py-2 text-right font-semibold text-black">
                {indicatorTitle}
              </th>
            </tr>
          </thead>
          <tbody>
            {indicatorHistoryData.map((row, index) => (
              <tr
                key={String(row.referenceDate)}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-2 text-gray-400">
                  {new Date(row.referenceDate).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-4 py-2 text-right text-cyan-700 font-semibold">
                  {row[indicatorKey] as number}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
