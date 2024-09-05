// src/redux/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthUser } from "@/lib/interface";

interface Auth {
  currentUser: AuthUser | null;
  pending: boolean;
  error: string | null;
}

const initialState: Auth = {
  currentUser: null,
  error: null,
  pending: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.pending = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.currentUser = action.payload;
      state.pending = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.currentUser = null;
      state.pending = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    registerRequest: (state) => {
      state.pending = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.currentUser = action.payload;
      state.pending = false;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.currentUser = null;
      state.pending = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registerRequest,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

export default authSlice.reducer;
