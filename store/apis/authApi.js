import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {SUPABASE_ANON_KEY,SUPABASE_JWT_TOKEN,SUPABASE_URL} from "@env";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: SUPABASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${SUPABASE_JWT_TOKEN}`);
      headers.set("apikey", SUPABASE_ANON_KEY);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // ✅ Sign up endpoint
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

    // ✅ Sign in endpoint
    signIn: builder.mutation({
      query: (userData) => ({
        url: "/signin",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    // ✅ Kullanıcıları çekme endpoint'i SUPABASE ile
    getUsers: builder.query({
      query: () => "rest/v1/users",
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetUsersQuery } =
  authApi;

export default authApi;
