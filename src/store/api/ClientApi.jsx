import { baseApi } from "../baseApi";

export const ClientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // POST API - Add new client request
    addClientRequest: builder.mutation({
      query: (requestData) => ({
        url: `/clientdetails/client-requests-add`,
        method: "POST",
        body: requestData,
      }),
      invalidatesTags: ['ClientRequests'], // Added to refresh lists after adding
      transformErrorResponse: (response) => response.data,
    }),

    // GET API - Get all client requests
    getAllClientRequests: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        return {
          url: `clientdetails/client-requests/list/${queryParams ? `?${queryParams}` : ''}`,
          method: "GET",
        };
      },
      providesTags: ['ClientRequests'],
    }),

    // GET API - Get single client request by ID
    getClientRequestById: builder.query({
      query: (id) => ({
        url: `clientdetails/client-requests/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: 'ClientRequests', id }],
    }),

    // NEW/UPDATED: Full Update API
    // This matches your Django path: client-requests/<int:id>/update/
    updateClientRequest: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `clientdetails/client-requests/${id}/update/`,
        method: "PUT", // Or "PATCH" depending on your Django ViewSet/APIView
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'ClientRequests', id },
        'ClientRequests'
      ],
    }),

    // Keep this if you have a specific view just for status, 
    // otherwise updateClientRequest replaces its utility.
    updateClientRequestStatus: builder.mutation({
      query: ({ requestId, status }) => ({
        url: `clientdetails/client-requests/${requestId}/update-status/`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags: ['ClientRequests'],
    }),

    convertRequestToClient: builder.mutation({
      query: (data) => ({
        url: `clientdetails/client-requests/convert/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['ClientRequests', 'Clients'],
    }),
  }),
});

export const {
  useAddClientRequestMutation,
  useGetAllClientRequestsQuery,
  useGetClientRequestByIdQuery,
  useGetClientRequestByRequestIdQuery,
  useUpdateClientRequestMutation, // Export the new full update hook
  useUpdateClientRequestStatusMutation,
  useConvertRequestToClientMutation,
} = ClientApi;