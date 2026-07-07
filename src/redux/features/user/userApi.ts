/* eslint-disable @typescript-eslint/no-explicit-any */

import TagTypes from "../../../constant/tagType.constant";
import { ErrorToast, SuccessToast } from "../../../helper/ValidationHelper";
import type { RootState } from "../../store/store";
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

    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      keepUnusedDataFor: 30,
      providesTags: [TagTypes.users],
    }),

    createUser: builder.mutation({
      query: (data: {
        name: string;
        email: string;
        password: string;
        role: string;
      }) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [TagTypes.users],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("User created successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something Went Wrong";
          ErrorToast(message);
        }
      },
    }),

    updateUser: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: string;
        data: { name?: string; password?: string; role?: string };
      }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [TagTypes.users],
      async onQueryStarted({ id }, { queryFulfilled, dispatch, getState }) {
        try {
          await queryFulfilled;
          SuccessToast("User updated successfully");

          const currentUserId = (getState() as RootState).user.user?._id;
          if (currentUserId === id) {
            dispatch(apiSlice.util.invalidateTags([TagTypes.me]));
          }
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something Went Wrong";
          ErrorToast(message);
        }
      },
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagTypes.users],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          SuccessToast("User deleted successfully");
        } catch (err: any) {
          const message = err?.error?.data?.message || "Something Went Wrong";
          ErrorToast(message);
        }
      },
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
