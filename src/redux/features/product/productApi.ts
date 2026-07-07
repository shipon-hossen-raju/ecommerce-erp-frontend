/* eslint-disable @typescript-eslint/no-explicit-any */
import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { IParam } from "../../../types/global.type";
import paramsGenerate from "../../utils/paramsGenerate";
import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args: IParam[]) => {
        const params = paramsGenerate(args);
        return {
          url: `/products?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 30,
      providesTags: [TagTypes.products],
    }),

    getProductCategories: builder.query({
      query: () => ({
        url: "/products/categories",
        method: "GET",
      }),
      keepUnusedDataFor: 300,
      providesTags: [TagTypes.products],
    }),

    createProduct: builder.mutation({
      query: (data: FormData) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [TagTypes.products, TagTypes.dashboard],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Product created successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something Went Wrong";
          ErrorToast(message);
        }
      },
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }: { id: string; data: FormData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [TagTypes.products, TagTypes.dashboard],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Product updated successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something Went Wrong";
          ErrorToast(message);
        }
      },
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.products, TagTypes.dashboard],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("Product deleted successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something Went Wrong";
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
