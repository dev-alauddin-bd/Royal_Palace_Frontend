// ====================================================
// 🧾 Auth API Module - User Authentication & Management
// ====================================================

import baseApi from '@/redux/api/baseApi';

// ===== 🔹 Inject auth-related endpoints into baseApi =====
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== ✅ Signup user =====
    signUpUser: build.mutation({
      query: (body) => ({
        url: '/users/signup',
        method: 'POST',
        body,
      }),
    }),

    // ===== ✅ Login user =====
    loginUser: build.mutation({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),
    // Firebase login mutation – receives a Firebase ID token and forwards to backend
    firebaseLogin: build.mutation({
      query: (idToken: string) => ({
        url: '/auth/firebase',
        method: 'POST',
        body: { idToken },
      }),
    }),

    // ===== ✅ Get current logged-in user info =====
    getMe: build.query({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    // ===== ✅ Get all users (admin access) with filters =====
    getUsers: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params?.searchTerm)
          queryParams.append('searchTerm', params.searchTerm);
        if (params?.page) queryParams.append('page', params.page);
        if (params?.limit) queryParams.append('limit', params.limit);
        return {
          url: `users/?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['User'],
    }),

    // ===== ✅ Get a single user by ID =====
    getSingleUser: build.query({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    // ===== ✅ Update a user (partial update with PATCH) =====
    updateUser: build.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// =====  Export auto-generated hooks =====
export const {
  useSignUpUserMutation,
  useLoginUserMutation,

  useFirebaseLoginMutation,
  useGetMeQuery,
  useGetUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = authApi;

export default authApi;
