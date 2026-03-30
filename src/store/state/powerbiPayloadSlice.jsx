import { createSlice } from "@reduxjs/toolkit";

const powerbiPayloadSlice = createSlice({
  name: "powerbiPayload",
  initialState: {
    payload: null,           // The full generated payload object
    generatedAt: null,       // Timestamp when it was generated
    isLoading: false,        // Optional: for UI feedback if needed
    error: null,             // In case generation fails
  },
  reducers: {
    setPayload(state, action) {
      console.log(
        "%c[Redux] setPayload called",
        "color: green; font-weight: bold;"
      );
      console.log("New Payload →", action.payload);

      state.payload = action.payload;
      state.generatedAt = new Date().toISOString();
      state.isLoading = false;
      state.error = null;

      console.log("Updated State →", state);
    },

    setPayloadLoading(state) {
      console.log(
        "%c[Redux] Payload Loading...",
        "color: orange; font-weight: bold;"
      );
      state.isLoading = true;
      state.error = null;
    },

    setPayloadError(state, action) {
      console.log(
        "%c[Redux] Payload Error",
        "color: red; font-weight: bold;"
      );
      console.error(action.payload);

      state.error = action.payload;
      state.isLoading = false;
    },

    clearPayload(state) {
      console.log(
        "%c[Redux] Payload Cleared",
        "color: blue; font-weight: bold;"
      );

      state.payload = null;
      state.generatedAt = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setPayload,
  setPayloadLoading,
  setPayloadError,
  clearPayload,
} = powerbiPayloadSlice.actions;

export default powerbiPayloadSlice.reducer;
