import ServerErrorCard from "../../components/card/ServerErrorCard";
import { useGetDashboardQuery } from "../../redux/features/dashboard/dashboardApi";

const DashboardPage = () => {
  const { data: resData, isLoading, isError } = useGetDashboardQuery(undefined);

  if (isLoading) {
    return <div className="text-gray-500">Loading dashboard...</div>;
  }

  if (isError) {
    return <ServerErrorCard />;
  }

  const data = resData?.data || {};
  const stats = [
    { label: "Total Products", value: data?.totalProducts ?? 0 },
    { label: "Total Sales", value: data?.totalSales ?? 0 },
    { label: "Low Stock Products", value: data?.lowStockCount ?? 0 },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
    </div>
  );
};

export default DashboardPage;
