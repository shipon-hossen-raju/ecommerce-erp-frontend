type TBarDatum = {
  label: string;
  value: number;
  color: string;
};

const StatBarChart = ({ data }: { data: TBarDatum[] }) => {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="bg-white rounded-card-radius shadow-card-shadow p-6">
      <p className="text-sm font-medium text-gray-600 mb-6">Overview</p>
      <div className="flex items-end justify-between gap-4 h-56">
        {data.map((d) => {
          const heightPct = Math.max((d.value / maxValue) * 100, 2);
          return (
            <div
              key={d.label}
              className="flex-1 h-full flex flex-col items-center justify-end gap-2 group"
            >
              <span className="text-sm font-semibold text-gray-800 tabular-nums">
                {d.value.toLocaleString()}
              </span>
              <div className="w-full h-full flex items-end justify-center">
                <div
                  title={`${d.label}: ${d.value.toLocaleString()}`}
                  style={{
                    height: `${heightPct}%`,
                    backgroundColor: d.color,
                    maxWidth: 48,
                  }}
                  className="w-full rounded-t-md transition-opacity group-hover:opacity-80"
                />
              </div>
              <span className="text-xs text-gray-500 text-center">
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatBarChart;
