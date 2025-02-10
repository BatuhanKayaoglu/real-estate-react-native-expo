import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import SUPABASE_CONFIG from '../../supabase/supabaseConfig';


export const drawerApi = createApi({
  reducerPath: "drawerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SUPABASE_CONFIG.SUPABASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${SUPABASE_CONFIG.SUPABASE_JWT_TOKEN}`);
      headers.set("apikey", SUPABASE_CONFIG.SUPABASE_ANON_KEY);
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
