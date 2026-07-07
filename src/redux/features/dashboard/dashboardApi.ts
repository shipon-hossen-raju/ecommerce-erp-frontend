import { apiSlice } from "../api/apiSlice.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch role-based dashboard summary stats
    getDashboard: builder.query({
      query: () => {
        return {
          url: `/dashboard`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.dashboard],
    }),
    // Fetch daily sales totals for the given number of days
    getSalesTrend: builder.query({
      query: (days: number) => {
        return {
          url: `/dashboard/sales-trend`,
          method: "GET",
          params: { days },
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.dashboard],
    }),
    // Fetch best-selling products for the given period
    getTopProducts: builder.query({
      query: ({ days, limit }: { days: number; limit?: number }) => {
        return {
          url: `/dashboard/top-products`,
          method: "GET",
          params: { days, limit },
        };
      },
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.dashboard],
    }),
  }),
});

export const {
  useGetDashboardQuery,
  useGetSalesTrendQuery,
  useGetTopProductsQuery,
} = dashboardApi;
