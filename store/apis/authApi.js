import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    prepareHeaders: (headers) => {
      headers.set(
        "Authorization",
        `Bearer ${process.env.EXPO_PUBLIC_JWT_TOKEN}`
      );
      headers.set("apikey", process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // ✅ Kullanıcıları çekme endpoint'i
    getUsers: builder.query({
      query: () => "rest/v1/users",
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetUsersQuery } =
  authApi;

export default authApi;
