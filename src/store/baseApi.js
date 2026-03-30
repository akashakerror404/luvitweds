import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import {
  getAuthToken,
  getRefreshToken,
  storeAuthToken,
  storeRefreshToken,
  removeUser
} from '../localstorage/Localstorage';

// 🔁 prevent multiple refresh calls
let refreshPromise = null;

// ✅ Custom base query with auto token + refresh
export const customBaseQuery = (baseUrl) => async (args, api, extraOptions) => {

  const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = getAuthToken();

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");

      return headers;
    },
  });

  let result = await baseQuery(args, api, extraOptions);

  // 🚨 If unauthorized → try refresh
  if (result.error?.status === 401) {
    const currentRefreshToken = getRefreshToken();

    // ❌ No refresh token → logout
    if (!currentRefreshToken) {
      removeUser();
      window.location.href = '/';
      return result;
    }

    // 🔄 Refresh function
    const refreshAccessToken = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/accounts/token/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh: currentRefreshToken }),
        });

        if (!response.ok) {
          throw new Error('Token refresh failed');
        }

        const data = await response.json();

        // ✅ Save new tokens
        storeAuthToken(data.access);
        if (data.refresh) {
          storeRefreshToken(data.refresh);
        }

        return data;

      } catch (error) {
        // ❌ Refresh failed → logout
        removeUser();
        window.location.href = '/';
        throw error;
      }
    };

    // 🚀 Avoid multiple refresh calls
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    try {
      const newTokens = await refreshPromise;

      // 🔁 Retry original request with new token
      result = await baseQuery(
        {
          ...args,
          headers: {
            ...(args.headers || {}),
            Authorization: `Bearer ${newTokens.access}`,
          },
        },
        api,
        extraOptions
      );

    } catch (error) {
      console.error('Token refresh failed:', error);
      return result;
    }
  }

  return result;
};


// ✅ Base API (MAIN EXPORT)
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery(process.env.REACT_APP_API_URL),
  tagTypes: [
    "CustomReports",
    "SavedFilters"
  ],
  endpoints: () => ({}), // inject later
});