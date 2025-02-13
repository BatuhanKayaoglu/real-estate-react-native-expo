import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./apis/authApi";
import authReducer from "./slicers/authSlice";
import { drawerApi } from "./apis/drawerApi";
import {listingApi} from './apis/listingApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [drawerApi.reducerPath]: drawerApi.reducer,
    [listingApi.reducerPath]: listingApi.reducer,

    // Reducers
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(drawerApi.middleware)
      .concat(listingApi.middleware),
});

setupListeners(store.dispatch); // RTK Query'nin otomatik yeniden çağırma (refetching) özelliklerini etkinleştirir.
