import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, setSelectedCountry } from '../app/countriesSlice';
import { fetchHoliday } from '../app/holidaySlice';
import { toggleTheme, setThemeDark, setThemeLight } from '../app/themeSlice';
import  DarkMode from "./DarkMode/DarkMode";

const HomePage = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const holidayRetrieved = useSelector((state) => state.holiday.holidays);
    const countriesList = useSelector((state) => state.countries.countries);
    useEffect(()=> {
        dispatch(fetchCountries());
    }, [])
    // useEffect(() => {
    //     console.log(holidayRetrieved);
    // }, [holidayRetrieved, countriesList])

    useEffect(() => {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
            dispatch(setThemeDark());
        } else {
            dispatch(setThemeLight());
        }
    }, [])

    useEffect(() => {
        if (currentTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [currentTheme]);
    
    const options = countriesList.map((country) => ({ value: country.name, key: country.code}))
    
    const [filteredOptions, setFilteredOptions] = useState(null);
    
    const [typedText, setTypedText] = useState('');
    
    const handleInputChange = (event) => {
        const input = event.target.value;
        const firstLetter = input.charAt(0).toUpperCase();
        const filtered = options.filter(
            (option) => option.value.charAt(0) === firstLetter
        );
        setFilteredOptions(filtered);
        setTypedText(input);
    };
    
    
    // const handleCountryChange = (event) => {
        //     console.log('as');
        //     // console.log(selectedCountry.name);
        //     // console.log(event.target.value);
        //     const selectedCountryObject = countriesList.find(country => country.name === typedText);
        //     setSelectedCountry(selectedCountryObject);
        //     console.log(selectedCountryObject);
        //     dispatch(fetchHoliday(selectedCountryObject.code))
        // };
        
        const loks = () => {
            console.log('laok');
        // const loki = 'akls';
        const selectedOption = options.find(
            (option) => option.value === typedText
            );
            console.log(selectedOption);
            if (selectedOption) {
                console.log('2nd');
            console.log(selectedOption);
            // if there is an exact match for the typed text, set the selected option to that match
            dispatch(setSelectedCountry({
                name: selectedOption.value,
                code: selectedOption.key,
            }))
        } else {
            console.log('3rd');
            // if there are no filtered options, set the selected option to the typed text value
            dispatch(setSelectedCountry({
                name: typedText,
                code: "",
            }))
        }
        const ask = selectedCountry;
        return ask;
    }
    
    const [some, setSome] = useState(0);
    
    const handleCountryChange = () => {
        // const loki = loks();
        // console.log(loki);
        // console.log(filteredOptions);
        console.log(selectedCountry);
        
        
        // if (selCountry.code === "") {
    //     console.log("CHale ");
    // } else {
        //     dispatch(fetchHoliday(selCountry.code));
        // }
    };
    const selectedCountry = useSelector((state) => state.countries.selectedCountry);    
    const dataFetchedRef = useRef(false);
    useEffect(() => {
        // if (dataFetchedRef.current) return;
        // dataFetchedRef.current = true;
        console.log('selectedCountry:', selectedCountry);
        setSome(some + 1);
        console.log(some);
        if (some === 1) {
            handleCountryChange();
        }
        console.log('stop');    
    }, [selectedCountry]);     
    
    return (
        <div className='h-screen w-full'>
            <div className="flex justify-center items-center fixed top-10 right-10">
                <DarkMode />
            </div>
            <div className='grid justify-center items-center h-full w-full'>
                <div className='w-80 text-center'>
                    <p className='text-[#364968] dark:text-[#f4f4f4] text-3xl'>Is Today A</p>
                    <p className='text-[#FD5F00] dark:text-[#FD5F00] text-4xl'>Public Holiday?</p>
                    <p className='text-center p-3'>Choose a country: </p>
                    <form onSubmit={(event) => {
                        event.preventDefault(); // prevent form submission and page reload
                        loks();
                        setSome(1);
                        // handleCountryChange();
                        console.log(typedText);
                    }} className='justify-center grid gap-y-4 text-center'>
                        <div className='relative'>
                            <input 
                                type="text"  
                                placeholder="" 
                                className='w-80 text-center p-1 border-2 dark:bg-gray-700 border-blue-500' 
                                value={typedText} 
                                onChange={handleInputChange}
                                list="countries" 
                            />
                            {filteredOptions && (
                                <datalist id="countries" className="absolute top-8 left-0 w-full">
                                    {filteredOptions.map((option) => (
                                        <option key={option.key} value={option.value} />
                                    ))}
                                </datalist>
                            )}
                        </div>
                        <div className='justify-center text-center'>
                            <button type="submit" onSubmit={handleCountryChange} className='w-32 justify-center bg-gray-500 hover:bg-blue-700 text-gray-800 dark:text-white font-serif py-1 px-4 rounded-xl'>Search</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HomePage;