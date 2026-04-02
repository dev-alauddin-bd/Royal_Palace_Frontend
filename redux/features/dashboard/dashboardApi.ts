// ===================================================================
// 📊 Dashboard API - Admin analytics data endpoint (RTK Query based)
// ===================================================================

import baseApi from '@/redux/api/baseApi';

// ========= Injecting Endpoint===============
const dashboardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== ✅ GET: Fetch admin dashboard analytics =====
    getDashboardData: build.query({
      query: () => ({
        url: '/dashboards',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
  }),

  // 🛑 Do not override existing endpoints
  overrideExisting: false,
});

// ====  Export hooks =====================
export const { useGetDashboardDataQuery } = dashboardApi;
export default dashboardApi;
