import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import apiKey  from "../apiKey";

const initialState = {
    loading: false,
    holidays: [],
    error: ''
}
export const fetchHoliday = createAsyncThunk('holiday/fetchHoliday', async (countryCode) => {
    const options = {
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com'
        }
    };
    const response = await axios.get('https://public-holiday.p.rapidapi.com/2023/'+countryCode, options);
    return response.data;
})



const holidaySlice = createSlice({
    name: 'holidays',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchHoliday.pending, state => {
            state.loading = true
        })
        builder.addCase(fetchHoliday.fulfilled, (state, action) => {
            state.loading = false
            state.holidays = action.payload
            if (!action.payload) {
                console.log('chale');
            }else {
                console.log(state.holidays);
            }
            state.error = ''
        })
        builder.addCase(fetchHoliday.rejected, (state, action) => {
            state.loading = false
            state.holidays = []
            state.error = action.error.message
            console.log(action.error.message);
        })
    }
});


export default holidaySlice.reducer;