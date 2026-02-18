import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  countries: [],
  selectedCountry: {},
};


const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries: (state, action) => {
      state.countries = action.payload;
    },
    setSelectedCountry: (state, action) => {
      state.selectedCountry = action.payload;
      console.log(state.selectedCountry);
    },
  },
});

export const { setCountries, setSelectedCountry } = countriesSlice.actions;

export const fetchCountries = () => async (dispatch) => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca2');
    const data = await response.json();
    const countries = data.map((country) => ({
      code: country.cca2,
      name: country.name.common,
    }));
    
    dispatch(setCountries(countries));
  } catch (error) {
    console.error(error);
  }
};

export default countriesSlice.reducer;
