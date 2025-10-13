import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import { api } from "../services/api";

const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
