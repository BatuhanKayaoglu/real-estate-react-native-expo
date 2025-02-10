import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {SUPABASE_ANON_KEY,SUPABASE_JWT_TOKEN,SUPABASE_URL} from "@env";

export const drawerApi = createApi({
  reducerPath: "drawerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SUPABASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${SUPABASE_JWT_TOKEN}`);
      headers.set("apikey", SUPABASE_ANON_KEY);
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
