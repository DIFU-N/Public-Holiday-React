import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import holidayReducer from "./holidaySlice";
import themeReducer from "./themeSlice";
import todayReducer from "./todaySlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        holiday: holidayReducer,
        countries: countriesReducer,
        today: todayReducer,
    }
})

export default store;