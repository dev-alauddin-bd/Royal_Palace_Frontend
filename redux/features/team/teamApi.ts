import baseApi from "../../api/baseApi";

const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTeamMembers: builder.query({
      query: () => ({
        url: "/teams",
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    createTeamMember: builder.mutation({
      query: (data) => ({
        url: "/teams/create-team",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),
    updateTeamMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `/teams/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Team"],
    }),
    deleteTeamMember: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetAllTeamMembersQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamApi;

export default teamApi;
