import { createSlice } from "@reduxjs/toolkit";

const powerbiFilterSlice = createSlice({
  name: "powerbiFilter",
  initialState: {
    activeFilter: null, // { filter_condition_id, name }
  },
  reducers: {
    setActiveFilter(state, action) {
      state.activeFilter = action.payload;
    },
    clearActiveFilter(state) {
      state.activeFilter = null;
    },
  },
});

export const { setActiveFilter, clearActiveFilter } =
  powerbiFilterSlice.actions;

export default powerbiFilterSlice.reducer;
