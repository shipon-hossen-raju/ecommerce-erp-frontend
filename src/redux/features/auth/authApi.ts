/* eslint-disable @typescript-eslint/no-explicit-any */
import { setToken } from "../../../helper/SessionHelper.ts";
import { SuccessToast } from "../../../helper/ValidationHelper.ts";
import { apiSlice } from "../api/apiSlice.ts";
import { SetLoginError } from "./authSlice.ts";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const res = await queryFulfilled;
          const token = res?.data?.data?.token;
          setToken(token);
          SuccessToast("Login Success");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } catch (err: any) {
          const status = err?.error?.status;
          const message = err?.error?.data?.message || "Something Went Wrong";
          if (status === 500) {
            dispatch(SetLoginError("Something Went Wrong"));
          } else {
            dispatch(SetLoginError(message));
          }
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
