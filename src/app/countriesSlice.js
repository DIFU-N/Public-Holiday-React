import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  selectedCountry: {},
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
    },
  },
});

export const apiKey = import.meta.env.VITE_REST_COUNTRIES_API;

export const { setCountries, setSelectedCountry } = countriesSlice.actions;

export const fetchCountries = () => async (dispatch) => {
  try {
    let offset = 0;
    const limit = 100;
    let allCountries = [];

    while (true) {
      const response = await fetch(
        `https://api.restcountries.com/countries/v5?limit=${limit}&offset=${offset}`,
        { headers: { Authorization: `Bearer ${apiKey}` } },
      );

      const data = await response.json();
      

      const batch = data.data.objects.map((country) => ({
        code: country.codes.alpha_2,
        name: country.names.common,
      }));

      allCountries.push(...batch);

      if (batch.length < limit) break;

      offset += limit;
    }

    dispatch(setCountries(allCountries));
  } catch (error) {
    console.error(error);
  }
};

export default countriesSlice.reducer;
