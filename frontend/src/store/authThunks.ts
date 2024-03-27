import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import User from "../types/User";

export const sendSignUpRequest = createAsyncThunk<
  User,
  { username: string; email: string; role: string; password: string; image: string }
>("auth/sendSignupRequest", async (userData) => {
  try {
    const { data } = await axios.post<User>(
      "http://127.0.0.1:9000/api/register",
      userData
    );
    return data;
  } catch (error) {
    throw new Error("Error creating your account");
  }
});

export const sendSignInRequest = createAsyncThunk<
  User,
  { email: string; password: string }
>("auth/sendSignInRequest", async (userData) => {
  try {
    const { data } = await axios.post<User>(
      "http://127.0.0.1:9000/api/login",
      userData
    );
    return data;
  } catch (error) {
    throw new Error("Error logging in");
  }
});
