import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_APP_BACKEND_BASE_URL}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      console.log(
        import.meta.env.VITE_APP_BACKEND_BASE_URL,
        "import.meta.env.VITE_APP_BACKEND_BASE_URL"
      );
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [
    "User",
  ],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/admin/login`,
        method: "POST",
        body,
      }),
    }),
    addUser: builder.mutation({
      query: (body) => ({
        url: `/admin/user`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getUser: builder.query({
      query: (page) => ({
        url: `/users?skip=${page}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    getDocument: builder.query({
      query: () => ({
        url: `/admin/documents`,
        method: "GET",
      }),
      providesTags: ["Document"],
    }),
    createPassword: builder.mutation({
      query: (body) => ({
        url: `/auth/create-password`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    deleteDocument: builder.mutation({
      query: (id) => ({
        url: `/admin/documents/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Document"],
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `/auth/change-password`,
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body,
      }),
    }),
    profileEdit: builder.mutation({
      query: ({ data, role, id }) => ({
        url: `/${role}/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getDashboardData: builder.query({
      query: ({ role }) => ({
        url: `/users?role=${role}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useAddUserMutation,
  useGetUserQuery,
  useGetDocumentQuery,
  useCreatePasswordMutation,
  useDeleteUserMutation,
  useDeleteDocumentMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useProfileEditMutation,
  useGetDashboardDataQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery
} = api;
