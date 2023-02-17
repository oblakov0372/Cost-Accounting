import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/user";
import cost from "./slices/cost";
import category from "./slices/category";
export const store = configureStore({
  reducer: {
    user,
    cost,
    category,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
