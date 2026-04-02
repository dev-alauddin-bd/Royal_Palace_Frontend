// ====================================================
// 🧾 Testimonial API Endpoints Module
// ====================================================

import baseApi from '@/redux/api/baseApi';

const testimonialApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== ✅ Create a new testimonial =====
    createTestimonial: build.mutation({
      query: (body) => ({
        url: '/testimonials',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Testimonial'],
    }),

    // ===== ✅ Get all testimonials with pagination =====
    findAllTestimonials: build.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/testimonials?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
      providesTags: ['Testimonial'],
    }),

    // ===== ✅ Get testimonials by room ID =====
    findTestimonialsByRoomId: build.query({
      query: (id) => ({
        url: `/testimonials/${id}`,
        method: 'GET',
      }),
      providesTags: ['Testimonial'],
    }),

    // ===== ✅ Delete testimonial by ID =====
    deleteTestimonial: build.mutation({
      query: (id) => ({
        url: `/testimonials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Testimonial'],
    }),
  }),
  overrideExisting: false,
});

// =====  Hooks export =====
export const {
  useCreateTestimonialMutation,
  useFindAllTestimonialsQuery,
  useFindTestimonialsByRoomIdQuery,
  useDeleteTestimonialMutation,
} = testimonialApi;

export default testimonialApi;
