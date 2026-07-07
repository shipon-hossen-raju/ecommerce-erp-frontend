/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import TagTypes from "../../../constant/tagType.constant.ts";
import { getToken } from "../../../helper/SessionHelper.ts";
import { ErrorToast } from "../../../helper/ValidationHelper.ts";
import config from "../../../config/index.config.ts";

export const backendUrl = config.backendUrl;
export const baseUrl = `${backendUrl}/api/v1`;

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: async (headers) => {
    if (getToken()) {
      headers.set("Authorization", `Bearer ${getToken()}`);
    }

    return headers;
  },
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401 && api.endpoint !== "login") {
      localStorage.clear();
      ErrorToast("Authorization Expired");
      window.location.href = "/";
    }
    return result;
  },
  tagTypes: Object.values(TagTypes), //TagS WhiteLists
  endpoints: (_builder) => ({}),
});
