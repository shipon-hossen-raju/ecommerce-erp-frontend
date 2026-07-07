/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import { apiSlice } from "../api/apiSlice";

export const saleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query({
      query: () => ({
        url: "/sales",
        method: "GET",
      }),
      keepUnusedDataFor: 30,
      providesTags: [TagTypes.sales],
    }),

    createSale: builder.mutation({
      query: (data: { items: { product: string; quantity: number }[] }) => ({
        url: "/sales",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [TagTypes.sales, TagTypes.products, TagTypes.dashboard],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Sale recorded successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something Went Wrong";
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const { useGetSalesQuery, useCreateSaleMutation } = saleApi;
