import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// const current = new Date();
// const date = `2023-01-01`;
// const date = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
const apiKey = import.meta.env.VITE_PUBLIC_HOLIDAY_API;

const initialState = {
  loading: false,
  holidays: [],
  error: "",
  noCode: false,
};

export const changeNoCode = (noCode) => {
  return (noCode = true);
};

export const fetchHoliday = createAsyncThunk(
  "holiday/fetchHoliday",
  async (countryCode) => {
    const options = {
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "public-holidays7.p.rapidapi.com",
      },
    };
    const response = await axios.get(
      "https://public-holidays7.p.rapidapi.com/2026/" + countryCode,
      options,
    );
    return response.data;
  },
);

const holidaySlice = createSlice({
  name: "holidays",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchHoliday.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchHoliday.fulfilled, (state, action) => {
      state.loading = false;
      state.noCode = false;
      state.holidays = action.payload;
      if (!action.payload) {
        state.noCode = changeNoCode(true);
      }
    });
    builder.addCase(fetchHoliday.rejected, (state, action) => {
      state.loading = false;
      state.holidays = [];
      state.error = action.error.message;
    });
  },
});

export default holidaySlice.reducer;
