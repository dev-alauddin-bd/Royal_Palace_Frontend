// ====================================================
// 🧾 Service API Endpoints Module
// ====================================================

import baseApi from '@/redux/api/baseApi';

const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== ✅ Create a new service =====
    createService: build.mutation({
      query: (body) => ({
        url: '/services',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Service'], // Invalidate cache after creation
    }),

    // ===== ✅ Get all services =====
    findAllService: build.query({
      query: () => ({
        url: '/services',
        method: 'GET',
      }),
      providesTags: ['Service'], // Provide cache tag for services
    }),

    // ===== ✅ Update a service by ID =====
    updateService: build.mutation({
      query: ({ id, formData }) => ({
        url: `/services/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Service'], // Invalidate cache after update
    }),

    // ===== ✅ Delete a service by ID =====
    deleteService: build.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Service'], // Invalidate cache after deletion
    }),
  }),

  // 🛑 Prevent endpoint override to avoid conflicts
  overrideExisting: false,
});

// =====  Hooks Export =====
export const {
  useCreateServiceMutation,
  useFindAllServiceQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;

export default serviceApi;
