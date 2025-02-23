import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const listingApi = createApi({
  reducerPath: "listingApi",
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
    // Tüm ilanları listeler.
    getListings: builder.query({
      query: () => "rest/v1/listings",
    }),

    // Kullanıcının yayınladıgı ilanları listeler.
    getListingsByUser: builder.query({
      query: ({ userId }) => ({
        url: "rest/v1/listings",
        params: {
          user_id: `eq.${userId}`,
        },
      }),
    }),

    // İlan başlıklarına göre filtreleme yapar.
    filterListings: builder.query({
      query: (titleFilter) =>
        `rest/v1/listings?title=ilike.*${titleFilter}*&select=*`,
      // Sorgunun yalnızca titleFilter geçerli olduğunda çalışması için "skip" özelliğini ekliyoruz.
      skip: (titleFilter) => !titleFilter || titleFilter.trim() === "",
    }),

    // İlanları yollanan parametreye(tarih, fiyat,alfabe) göre sıralar.
    getListingsByParams: builder.query({
      query: ({ column = "price", order = "asc" }) => ({
        url: "rest/v1/listings",
        params: {
          order: `${column}.${order}`,
        },
      }),
    }),
  }),
});

export const {
  useGetListingsQuery,
  useFilterListingsQuery,
  useGetListingsByParamsQuery,
  useGetListingsByUserQuery,
} = listingApi;

export default listingApi;
