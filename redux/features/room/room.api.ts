// ====================================================
// 🧾 Room API Endpoints Module
// ====================================================

import baseApi from '@/redux/api/baseApi';

const roomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== ✅ Create a new room =====
    createRoom: build.mutation({
      query: (body) => ({
        url: '/rooms',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Room'],
    }),

    // ===== ✅ Get all rooms =====
    findAllRooms: build.query({
      query: () => ({
        url: '/rooms',
        method: 'GET',
      }),
      providesTags: ['Room'],
    }),

    // ===== 🔍 Filter rooms with search, date, guest & price params =====
    filterAllRooms: build.query({
      query: (params) => {
        const queryParams = new URLSearchParams();

        if (params?.checkInDate)
          queryParams.append('checkInDate', params.checkInDate);
        if (params?.checkOutDate)
          queryParams.append('checkOutDate', params.checkOutDate);
        if (params?.adults) queryParams.append('adults', params.adults);
        if (params?.children) queryParams.append('children', params.children);
        if (params?.searchTerm)
          queryParams.append('searchTerm', params.searchTerm);
        if (params?.type) queryParams.append('type', params.type);
        if (params?.priceMin)
          queryParams.append('priceMin', String(params.priceMin));
        if (params?.priceMax)
          queryParams.append('priceMax', String(params.priceMax));
        if (params?.limit) queryParams.append('limit', String(params.limit));
        if (params?.page) queryParams.append('page', String(params.page));

        return {
          url: `/rooms?${queryParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Room'],
    }),

    // ===== ✅ Get single room by ID =====
    findSingleRoom: build.query({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: 'GET',
      }),
      providesTags: ['Room'],
    }),

    // ===== ✅ Update room by ID =====
    updateRoom: build.mutation({
      query: ({ id, ...formData }) => ({
        url: `/rooms/${id}`,
        method: 'PATCH',
        body: formData,
      }),
      invalidatesTags: ['Room'],
    }),

    // ===== ✅ Delete room by ID =====
    deleteRoom: build.mutation({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Room'],
    }),
  }),
  overrideExisting: false,
});

// =====  Hooks export =====
export const {
  useCreateRoomMutation,
  useFindAllRoomsQuery,
  useFilterAllRoomsQuery,
  useFindSingleRoomQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;

export default roomApi;
