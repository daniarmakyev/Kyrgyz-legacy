import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./Users/Users.slice";
import { wordsSlice } from "./Words/Words.slice";


export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    words: wordsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;