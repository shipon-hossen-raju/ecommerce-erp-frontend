/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast } from "../../../helper/ValidationHelper";
import { apiSlice } from "../api/apiSlice";
import { SetUser } from "./userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: [TagTypes.me],
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const data = res?.data?.data;
          dispatch(SetUser(data));
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            ErrorToast("Something Went Wrong");
          } else {
            ErrorToast(message);
          }
        }
      },
    }),
  }),
});

export const { useGetMeQuery } = userApi;
