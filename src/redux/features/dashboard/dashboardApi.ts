import { apiSlice } from "../api/apiSlice.js";
import TagTypes from "../../../constant/tagType.constant.js";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const { useGetDashboardQuery } = dashboardApi;
