import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterValues, LoginValues } from "../../helpers/types"; 
import { $axios } from "../../helpers/axios";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async ({ data }: { data: RegisterValues }) => {
    try {
      const res = await $axios.post("/users/register", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Registration error';
      throw new Error(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (data: LoginValues) => {
    try {
      const res = await $axios.post("/users/login", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const tokens = {
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken
      };

      localStorage.setItem("tokens", JSON.stringify(tokens));

      return res.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login error';
      throw new Error(errorMessage);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "users/fetchCurrentUser",
  async () => {
    const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");
    const res = await $axios.get("/users/me", {
      headers: {
        'Authorization': `Bearer ${tokens.accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  }
);
