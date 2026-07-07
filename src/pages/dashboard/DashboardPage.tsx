import ServerErrorCard from "../../components/card/ServerErrorCard";
import { getUserInfo } from "../../helper/SessionHelper";
import { useGetDashboardQuery } from "../../redux/features/dashboard/dashboardApi";

const DashboardPage = () => {
  const user = getUserInfo();
  const { data: resData, isLoading, isError } = useGetDashboardQuery(undefined);

  if (isLoading) {
    return <div className="text-gray-500">Loading dashboard...</div>;
  }

  if (isError) {
    return <ServerErrorCard />;
  }

  const data = resData?.data || {};

  const stats =
    user?.role === "EMPLOYEE"
      ? [
          { label: "My Sales", value: data?.mySalesCount ?? 0 },
          { label: "My Earnings", value: data?.myEarnings ?? 0 },
        ]
      : [
          ...(user?.role === "ADMIN"
            ? [{ label: "Total Users", value: data?.totalUsers ?? 0 }]
            : []),
          { label: "Total Products", value: data?.totalProducts ?? 0 },
          { label: "Total Sales", value: data?.totalSales ?? 0 },
          { label: "Low Stock Products", value: data?.lowStockCount ?? 0 },
        ];

  return (
    <div>
      <div
        className={`grid grid-cols-1 gap-4 ${
          stats.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"
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
    </div>
  );
};

export default DashboardPage;
