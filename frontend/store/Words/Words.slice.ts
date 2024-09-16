import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StatesTypeWords, Word } from "../../helpers/types";
import { fetchWordByLevel } from "./Words.action";

const INIT_STATE: StatesTypeWords = {
  error: null,
  loading: false,
  words: null, 
};

export const wordsSlice = createSlice({
  name: "words",
  initialState: INIT_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordByLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWordByLevel.fulfilled, (state, action: PayloadAction<Word[]>) => {
        state.loading = false;
        state.words = action.payload;
      })
      .addCase(fetchWordByLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch word';
      });
  },
});

export default wordsSlice.reducer;
