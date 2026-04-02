// ====================================================
// 🧾 Booking API Endpoints Module
// ====================================================

import baseApi from '@/redux/api/baseApi';

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== ✅ Initiate Booking =====
    bookingInitiate: build.mutation({
      query: (body) => ({
        url: '/bookings/init',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Booking'],
    }),

    // ===== ✅ Cancel Booking by booking ID =====
    cancelBooking: build.mutation({
      query: (id: string) => ({
        url: `/bookings/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Booking'],
    }),

    // ===== ✅ Get All Bookings (with optional filters) =====
    getAllBookings: build.query({
      query: (params) => ({
        url: '/bookings',
        method: 'GET',
        params,
      }),
      providesTags: ['Booking'],
    }),

    // ===== ✅ Get Booking By ID =====
    getBookingById: build.query({
      query: (id: string) => ({
        url: `/bookings/${id}`,
        method: 'GET',
      }),
      providesTags: ['Booking'],
    }),

    // ===== ✅ Get Bookings by User ID =====
    getBookingsByUserId: build.query({
      query: (id: string) => ({
        url: `/bookings/userId/${id}`,
        method: 'GET',
      }),
      providesTags: ['Booking'],
    }),

    // ===== ✅ Get Booked Dates for a Room/User =====
    getBookedDates: build.query<string[], string>({
      query: (userId) => ({
        url: `/bookings/${userId}`,
        method: 'GET',
      }),
      transformResponse: (response: any) => {
        if (response?.success && Array.isArray(response?.data?.bookedDates)) {
          return response.data.bookedDates.filter(
            (d: any) => typeof d === 'string' && d.trim(),
          );
        }
        return [];
      },
      providesTags: ['Booking'],
    }),

    // ===== ⚠️ Duplicate Cancel Booking Mutation (typo in name 'cnacelBooking') =====
    cnacelBooking: build.mutation({
      query: (id: string) => ({
        url: `/bookings/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Booking'],
    }),
  }),
  overrideExisting: false,
});

// ===== Hooks export =====
export const {
  useBookingInitiateMutation,
  useCancelBookingMutation,
  useGetAllBookingsQuery,
  useGetBookingByIdQuery,
  useGetBookedDatesQuery,
  useGetBookingsByUserIdQuery,
  useCnacelBookingMutation,
} = bookingApi;

export default bookingApi;
