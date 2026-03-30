import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./baseApi";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import tokenReducer from "./state/token";
import menuReducer from "./state/menuSlice";
import powerbiFilterReducer from "./state/powerbiFilterSlice";
import previewmanagerReducer from "./state/previewmanagerSlice";
import powerbiPayloadReducer from "./state/powerbiPayloadSlice";

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  token: tokenReducer,
  menu: menuReducer,
  powerbiFilter: powerbiFilterReducer,
  previewmanager: previewmanagerReducer,
  powerbiPayload: powerbiPayloadReducer, 
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "token",
    "menu",
    "powerbiFilter",
    "powerbiPayload", 
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;