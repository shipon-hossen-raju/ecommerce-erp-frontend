import { setToken } from "../../../helper/SessionHelper.ts";
import { SuccessToast } from "../../../helper/ValidationHelper.ts";
import { apiSlice } from "../api/apiSlice.ts";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          const token = res?.data?.data?.token;
          setToken(token);
          SuccessToast("Login Success");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } catch {
          // error is handled by the caller via `login(data).unwrap()`
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
