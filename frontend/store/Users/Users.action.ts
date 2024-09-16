import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterValues } from "../../helpers/types";
import axios from "axios";

export const registerUser = createAsyncThunk(
    "users/registerUser",
    async (
      { data }: { data: RegisterValues },
    ) => {
      try {
        const res = await axios.post("http://localhost:8080/api/users/register", data, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        return res.data;
      } catch (error: any) {
        console.error('Error registering user:', error);
        throw error;
      }
    }
  );