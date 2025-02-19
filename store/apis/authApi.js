import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import SUPABASE_CONFIG from "../../supabase/supabaseConfig";

export const authApi = createApi({
  reducerPath: "authApi",
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
    // ✅ Kullanıcıları çekme endpoint'i
    getUsers: builder.query({
      query: () => "rest/v1/users",
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetUsersQuery } =
  authApi;

export default authApi;
