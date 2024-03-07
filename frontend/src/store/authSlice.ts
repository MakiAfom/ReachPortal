import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../types/User";
import { sendSignInRequest, sendSignUpRequest } from "./authThunks";

interface AuthState {
  status: "idle" | "pending" | "fulfilled" | "rejected";
  user: User;
  message: string;
}

const initUser: User = {
  userId: "",
  username: "",
  email: "",
  role: "",
  token: "",
  tokenExpirationDate: "",
};

const initialState: AuthState = {
  status: "idle",
  user: initUser,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.status = "fulfilled";
      state.user = structuredClone(action.payload);
      state.message = "You're logged in successfully";
    },
    logout: (state) => {
      state.status = "fulfilled";
      state.user = structuredClone(initUser);
      state.message = "You're logged out successfully";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(sendSignUpRequest.pending, (state) => {
        state.status = "pending";
        state.message = "";
      })
      .addCase(sendSignUpRequest.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = structuredClone(action.payload);
        state.message = "Account created successfully";
      })
      .addCase(sendSignUpRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.error.message || "Something went wrong!";
      })
      .addCase(sendSignInRequest.pending, (state) => {
        state.status = "pending";
        state.message = "";
      })
      .addCase(sendSignInRequest.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.user = structuredClone(action.payload);
        state.message = "You are logged in successfully";
      })
      .addCase(sendSignInRequest.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.error.message || "Something went wrong!";
      });
  },
});

export const authActions = authSlice.actions;
