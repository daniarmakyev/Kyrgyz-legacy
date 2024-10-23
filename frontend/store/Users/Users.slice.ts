import { createSlice } from "@reduxjs/toolkit";
import { StatesType } from "../../helpers/types";
import { registerUser, loginUser, fetchCurrentUser, updateCurrentUser } from "./Users.action";

const INIT_STATE: StatesType = {
  error: null,
  loading: false,
  user: null,
  currentUser: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState: INIT_STATE,
  reducers: {
    logout(state) {
      state.user = INIT_STATE.user;
      state.currentUser = INIT_STATE.currentUser;
      state.error = INIT_STATE.error;
      state.loading = INIT_STATE.loading;
      localStorage.removeItem("tokens");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentUser = action.payload;
        
        localStorage.setItem('lives', action.payload.lives);
      })
      
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.currentUser = { ...state.currentUser, ...action.payload }; 
        console.log("Updated currentUser:", state.currentUser);
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as string;
      });
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;