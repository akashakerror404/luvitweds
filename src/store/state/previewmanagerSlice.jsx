// previewmanagerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const previewmanagerSlice = createSlice({
  name: "previewmanager",
  initialState: {
    is_preview: false,
    menu_click_true: false,
    navigationlink: "", 
  },
  reducers: {
    setIsPreview(state, action) {
      state.is_preview = action.payload;
      console.log("[previewmanager] is_preview changed to:", state.is_preview);
    },

    setMenuClickTrue(state, action) {
      state.menu_click_true = action.payload;
      console.log("[previewmanager] menu_click_true changed to:", state.menu_click_true);
    },

    setNavigationLink(state, action) {
      state.navigationlink = action.payload;
      console.log("[previewmanager] navigationlink changed to:", state.navigationlink);
    },
  },
});

export const { setIsPreview, setMenuClickTrue, setNavigationLink } = previewmanagerSlice.actions;

export default previewmanagerSlice.reducer;
