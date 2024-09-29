// src/redux/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfile } from "@/lib/interface";

interface UserState {
  profile: UserProfile | null;
  pending: boolean;
  error: string | null;
}

const initialState: UserState = {
  profile: null,
  pending: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserRequest: (state) => {
      state.pending = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.pending = false;
      state.error = null;
    },
    fetchUserFailure: (state, action: PayloadAction<string>) => {
      state.profile = null;
      state.pending = false;
      state.error = action.payload;
    },
    updateUserRequest: (state) => {
      state.pending = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.pending = false;
      state.error = null;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.pending = false;
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.profile = null;
      state.error = null;
      state.pending = false;
    },
  },
});

export const {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;
