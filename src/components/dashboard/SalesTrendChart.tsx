import { useState } from "react";
import NoDataFount from "../card/NoDataFount";

type TTrendDatum = {
  date: string;
  totalAmount: number;
  count: number;
};

const WIDTH = 640;
const HEIGHT = 220;
const PADDING = 24;

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const SalesTrendChart = ({ data }: { data: TTrendDatum[] }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-card-radius shadow-card-shadow p-6">
        <p className="text-sm font-medium text-gray-600 mb-4">
          Sales Trend (Amount)
        </p>
        <NoDataFount text="No sales in this period" />
      </div>
    );
  }

  const maxAmount = Math.max(...data.map((d) => d.totalAmount), 1);
  const innerWidth = WIDTH - PADDING * 2;
  const innerHeight = HEIGHT - PADDING * 2;

  const points = data.map((d, i) => {
    const x =
      data.length > 1
        ? (i / (data.length - 1)) * innerWidth + PADDING
        : PADDING;
    const y = HEIGHT - PADDING - (d.totalAmount / maxAmount) * innerHeight;
    return { x, y, ...d };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;
  const tickIndexes =
    data.length > 1
      ? [0, Math.floor((data.length - 1) / 2), data.length - 1]
      : [0];

  return (
    <div className="bg-white rounded-card-radius shadow-card-shadow p-6">
      <p className="text-sm font-medium text-gray-600 mb-4">
        Sales Trend (Amount)
      </p>
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full h-56"
          preserveAspectRatio="none"
        >
          <line
            x1={PADDING}
            y1={HEIGHT - PADDING}
            x2={WIDTH - PADDING}
            y2={HEIGHT - PADDING}
            stroke="#e1e0d9"
            strokeWidth={1}
          />

          <path d={pathD} fill="none" stroke="#144A6C" strokeWidth={2} />

          {points.map((p, i) => (
            <circle
              key={p.date}
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 5 : 4}
              fill="#144A6C"
              stroke="#fff"
              strokeWidth={2}
              onPointerEnter={() => setHoverIndex(i)}
              onPointerLeave={() => setHoverIndex(null)}
              style={{ cursor: "pointer" }}
            />
          ))}

          {tickIndexes.map((i) => (
            <text
              key={i}
              x={points[i].x}
              y={HEIGHT - 4}
              fontSize={10}
              fill="#898781"
              textAnchor={
                i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"
              }
            >
              {formatDate(points[i].date)}
            </text>
          ))}
        </svg>

        {hovered && (
          <div
            className="absolute bg-gray-800 text-white text-xs rounded-md px-3 py-2 pointer-events-none -translate-x-1/2 -translate-y-full"
            style={{
              left: `${(hovered?.x / WIDTH) * 100}%`,
              top: `${(hovered?.y / HEIGHT) * 100}%`,
            }}
          >
            <p className="font-semibold">
              {hovered.totalAmount.toLocaleString()}
            </p>
            <p className="text-gray-300">
              {formatDate(hovered?.date)} · {hovered.count} sale
              {hovered.count === 1 ? "" : "s"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesTrendChart;
