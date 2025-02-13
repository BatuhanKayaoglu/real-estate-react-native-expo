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
      
    }),

    // ✅ İlanları çekme endpoint'i SUPABASE ile
    getListings: builder.query({
      query: () => "rest/v1/listings",
    }),

    
    filterListings: builder.query({
      query: (titleFilter) => `rest/v1/listings?title=ilike.*${titleFilter}*&select=*`,
      // Sorgunun yalnızca titleFilter geçerli olduğunda çalışması için "skip" özelliğini ekliyoruz.
      skip: (titleFilter) => !titleFilter || titleFilter.trim() === "",
    }),
    

  }),

  
  
});

export const { useSignUpMutation, useGetListingsQuery,useFilterListingsQuery  } =
listingApi;

export default listingApi;
