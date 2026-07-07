import { useState } from "react";
import ServerErrorCard from "../../components/card/ServerErrorCard";
import DateRangeFilter from "../../components/dashboard/DateRangeFilter";
import LowStockTable from "../../components/dashboard/LowStockTable";
import SalesTrendChart from "../../components/dashboard/SalesTrendChart";
import StatBarChart from "../../components/dashboard/StatBarChart";
import TopProductsChart from "../../components/dashboard/TopProductsChart";
import { getUserInfo } from "../../helper/SessionHelper";
import {
  useGetDashboardQuery,
  useGetSalesTrendQuery,
  useGetTopProductsQuery,
} from "../../redux/features/dashboard/dashboardApi";
import type { IProduct } from "../../types/product.type";

const DashboardPage = () => {
  const user = getUserInfo();
  const isEmployee = user?.role === "EMPLOYEE";
  const isAdmin = user?.role === "ADMIN";
  const isManager = user?.role === "MANAGER";

  const [rangeDays, setRangeDays] = useState(30);

  const { data: resData, isLoading, isError } = useGetDashboardQuery(undefined);
  const { data: salesTrendRes } = useGetSalesTrendQuery(rangeDays, {
    skip: !isAdmin && !isManager,
  });
  const { data: topProductsRes } = useGetTopProductsQuery(
    { days: rangeDays, limit: 5 },
    { skip: !isAdmin && !isManager },
  );

  if (isLoading) {
    return <div className="text-gray-500">Loading dashboard...</div>;
  }

  if (isError) {
    return <ServerErrorCard />;
  }

  const data = resData?.data || {};

  const stats = isEmployee
    ? [
        { label: "My Sales", value: data?.mySalesCount ?? 0 },
        { label: "My Earnings", value: data?.myEarnings ?? 0 },
      ]
    : [
        ...(isAdmin
          ? [{ label: "Total Users", value: data?.totalUsers ?? 0 }]
          : []),
        { label: "Total Products", value: data?.totalProducts ?? 0 },
        { label: "Total Sales", value: data?.totalSales ?? 0 },
        { label: "Low Stock Products", value: data?.lowStockCount ?? 0 },
      ];

  const chartColors = ["#144A6C", "#8BCF9A", "#FF7D7D", "#e4c96b"];
  const chartData = stats.map((stat, index) => ({
    label: stat.label,
    value: stat.value,
    color: chartColors[index % chartColors.length],
  }));

  const lowStockProducts: IProduct[] = data?.lowStockProducts ?? [];

  return (
    <div className="flex flex-col gap-6">
      <div
        className={`grid grid-cols-1 gap-4 ${
          stats.length === 4
            ? "sm:grid-cols-4"
            : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-card-radius shadow-card-shadow p-6"
          >
            <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {isAdmin ? (
        <>
          <DateRangeFilter value={rangeDays} onChange={setRangeDays} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SalesTrendChart data={salesTrendRes?.data ?? []} />
            <TopProductsChart data={topProductsRes?.data ?? []} />
          </div>
        </>
      ) : isManager ? (
        <>
          {/* <StatBarChart data={chartData} /> */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <SalesTrendChart data={salesTrendRes?.data ?? []} />
            <div className="flex flex-col gap-4">
              <DateRangeFilter value={rangeDays} onChange={setRangeDays} />
              <TopProductsChart data={topProductsRes?.data ?? []} />
            </div>
          </div>
        </>
      ) : (
        <StatBarChart data={chartData} />
      )}

      {!isEmployee && <LowStockTable products={lowStockProducts} />}
    </div>
  );
};

export default DashboardPage;
