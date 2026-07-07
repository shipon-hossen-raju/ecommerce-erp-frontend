import NoDataFount from "../card/NoDataFount";

type TTopProduct = {
  productId: string;
  productName: string;
  totalQuantity: number;
  totalRevenue: number;
};

const TopProductsChart = ({ data }: { data: TTopProduct[] }) => {
  const maxQuantity = Math.max(...data.map((d) => d.totalQuantity), 1);

  return (
    <div className="bg-white rounded-card-radius shadow-card-shadow p-6">
      <p className="text-sm font-medium text-gray-600 mb-4">
        Top Selling Products
      </p>

      {data.length === 0 ? (
        <NoDataFount text="No sales in this period" />
      ) : (
        <div className="flex flex-col gap-3">
          {data.map((product) => {
            const widthPct = Math.max(
              (product.totalQuantity / maxQuantity) * 100,
              4,
            );
            return (
              <div key={product.productId} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-sm">
                  <span
                    className="font-medium text-gray-800 truncate pr-2"
                    title={product.productName}
                  >
                    {product.productName}
                  </span>
                  <span className="text-gray-500 tabular-nums shrink-0">
                    {product.totalQuantity} sold
                  </span>
                </div>
                <div
                  className="h-3 bg-gray-100 rounded-full"
                  title={`${product.productName}: ${product.totalQuantity} sold · ${product.totalRevenue.toLocaleString()} revenue`}
                >
                  <div
                    className="h-3 rounded-full bg-primary"
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TopProductsChart;
