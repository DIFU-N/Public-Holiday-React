import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentTheme: 'light',
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setThemeDark: (state) => {
            state.currentTheme = 'dark';
        },
        setThemeLight: (state) => {
            state.currentTheme = 'light';
        },
        toggleTheme: (state) => {
            console.log('lok');
            state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
        },
    }
})

export const { toggleTheme, setThemeDark, setThemeLight } = themeSlice.actions;
export default themeSlice.reducer;
