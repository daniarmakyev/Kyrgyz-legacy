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
  async (data: LoginValues) => { // убрали обертку { data }
    try {
      const res = await $axios.post("/users/login", data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem("tokens", JSON.stringify(res.data.tokens));
      return res.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Login error';
      throw new Error(errorMessage);
    }
  }
);
