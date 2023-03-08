import { configureStore } from "@reduxjs/toolkit";
import holidayReducer from "./holidaySlice";
import themeReducer from "./themeSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        holiday: holidayReducer
    }
})

export default store;