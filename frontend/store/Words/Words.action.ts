import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Word } from "../../helpers/types";
import { $axios } from "../../helpers/axios";

export const fetchWordByLevel = createAsyncThunk<Word[], string>(
  "words/fetchWordByLevel",
  async (id: string) => {
    try {
      const response = await $axios.get<Word[]>(`/words/level/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching word:', error);
      throw error;
    }
  }
);
