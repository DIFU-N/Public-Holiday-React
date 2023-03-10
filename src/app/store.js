import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import holidayReducer from "./holidaySlice";
import themeReducer from "./themeSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        holiday: holidayReducer,
        countries: countriesReducer,
    }
})

export default store;