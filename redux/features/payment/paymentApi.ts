// ====================================================
// 🧾  Payment API Endpoints Module
// ====================================================

import baseApi from '@/redux/api/baseApi';
interface BookingInitiateResponse {
  clientSecret: string;
  transactionId: string;
}

interface CancelPaymentPayload {
  bookingId: string;
}

interface CancelPaymentResponse {
  success: boolean;
  message: string;
}
interface ConfirmPaymentRequest {
  bookingId: string;          // transactionId from initiate
  paymentIntentId: string;    // stripe paymentIntent id
}

interface ConfirmPaymentResponse {
  success: boolean;
  message: string;
}
const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({

    // ===== Get all payments with optional filters =====


    getPayments: build.query({
      query: (params) => {
        const query = new URLSearchParams();

        if (params?.page) query.append('page', params.page.toString());
        if (params?.limit) query.append('limit', params.limit.toString());
        if (params?.status) query.append('status', params.status);
        if (params?.searchTerm) query.append('searchTerm', params.searchTerm);

        return {
          url: `/payments?${query.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Payment'],
    }),


     cancelPayment: build.mutation<CancelPaymentResponse, CancelPaymentPayload>({
      query: (data) => ({
        url: '/cancel',
        method: 'POST',
        body: data,
      }),
    }),
    // ===== Get payments for a specific user by ID =====
    getPaymentsByUserId: build.query({
      query: (id: string) => ({
        url: `/payments/${id}`,
        method: 'GET',
      }),
      providesTags: ['Payment'],
    }),
  }),
  overrideExisting: false,
});

// ===== Hooks export =====
export const { useGetPaymentsQuery, useCancelPaymentMutation, useGetPaymentsByUserIdQuery,  } = paymentApi;

export default paymentApi;
