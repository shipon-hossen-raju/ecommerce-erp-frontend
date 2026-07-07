const PRESETS = [
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "90D", days: 90 },
];

const DateRangeFilter = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (days: number) => void;
}) => {
  return (
    <div className="flex items-center gap-1 bg-white rounded-card-radius shadow-card-shadow p-1 w-fit">
      {PRESETS.map((preset) => (
        <button
          key={preset.days}
          type="button"
          onClick={() => onChange(preset.days)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            value === preset.days
              ? "bg-primary text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
};

export default DateRangeFilter;
