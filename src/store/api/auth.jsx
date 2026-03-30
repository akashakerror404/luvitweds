import { baseApi } from "../baseApi";

export const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Login API
    login: builder.mutation({
      query: (loginData) => ({
        url: `/api/accounts/login/`,
        method: "POST",
        body: loginData,
      }),
    }),

    // Logout API
    logout: builder.mutation({
      query: (refreshToken) => ({
        url: `/api/accounts/logout/`,
        method: "POST",
        body: refreshToken,   // { refresh: "token_here" }
      }),
    }),

    // Send OTP for password reset
    sendPasswordResetOtp: builder.mutation({
      query: (emailOrUsername) => ({
        url: `/api/accounts/password-reset/send-otp/`,
        method: "POST",
        body: emailOrUsername,
      }),
    }),

    // Verify OTP for password reset
    verifyPasswordResetOtp: builder.mutation({
      query: (data) => ({
        url: `/api/accounts/password-reset/verify-otp/`,
        method: "POST",
        body: data,
      }),
    }),

    // Complete password reset
    completePasswordReset: builder.mutation({
      query: (data) => ({
        url: `/api/accounts/password-reset/complete/`,
        method: "POST",
        body: data,
      }),
    }),

    // 🔐 Change Password API
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/api/accounts/change-password/`,
        method: "POST",
        body: data, // { old_password, new_password }
      }),
    }),

    // Token refresh API
refreshToken: builder.mutation({
  query: (refreshToken) => ({
    url: "/api/accounts/token/refresh/",
    method: "POST",
    body: { refresh: refreshToken },
  }),
}),


  }),
});

// Export hooks
export const { 
  useLoginMutation, 
  useLogoutMutation,
  useSendPasswordResetOtpMutation, 
  useVerifyPasswordResetOtpMutation,
  useCompletePasswordResetMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation
} = AuthApi;
