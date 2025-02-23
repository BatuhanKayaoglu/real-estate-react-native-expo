import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const drawerApi = createApi({
  reducerPath: "drawerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_JWT_TOKEN}`
      );
      headers.set("apikey", process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getDrawers: builder.query({
      query: () => "rest/v1/bar",
    }),
  }),
});

export const { useGetDrawersQuery } =
drawerApi;

export default drawerApi;
