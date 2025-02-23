import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const favouriteApi = createApi({
  reducerPath: "favouriteApi",
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
    addFavouriteByUser: builder.mutation({
      query: ({ userId: user_id, listingId: listing_id }) => ({
        url: "rest/v1/favorites",
        method: "POST",
        body: { user_id, listing_id }, 
      }),
    }),

    getFavouritesByUser: builder.query({
      query: ({ userId }) => `rest/v1/favorites?user_id=eq.${userId}&select=id,user_id,listing_id,listings!favorites_listing_id_fkey(id,title,price,location,status)`, 
    }),

    removeFavourite: builder.mutation({
      query: ({ favouriteId }) => ({
        url: `rest/v1/favorites?id=eq.${favouriteId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useRemoveFavouriteMutation,
  useAddFavouriteByUserMutation,
  useGetFavouritesByUserQuery,
} = favouriteApi;

export default favouriteApi;
