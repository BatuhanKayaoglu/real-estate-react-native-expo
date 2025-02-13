import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import SUPABASE_CONFIG from '../../supabase/supabaseConfig';


export const listingApi = createApi({
  reducerPath: "listingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SUPABASE_CONFIG.SUPABASE_URL,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${SUPABASE_CONFIG.SUPABASE_JWT_TOKEN}`
      );
      headers.set("apikey", SUPABASE_CONFIG.SUPABASE_ANON_KEY);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // ✅ İlanları çekme endpoint'i SUPABASE ile
    getListings: builder.query({
      query: () => "rest/v1/listings",
    }),
  }),
});

export const { useSignUpMutation, useGetListingsQuery } =
listingApi;

export default listingApi;
