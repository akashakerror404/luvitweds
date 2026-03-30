import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuList: [],  // store full menu
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenu: (state, action) => {
      state.menuList = action.payload;
      // Also save to localStorage for page reload persistence
      localStorage.setItem("menuList", JSON.stringify(action.payload));
    },
  },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
