import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDate: false
}

const todaySlice = createSlice({
    name: 'today',
    initialState,
    reducers: {
        setIsDateTrue: (state) => {
            state.isDate = true;
        },
        setIsDateFalse: (state) => {
            state.isDate = false;
        }
    }
})

export const { setIsDateTrue, setIsDateFalse } = todaySlice.actions;
export default todaySlice.reducer;
