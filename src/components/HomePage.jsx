import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, setSelectedCountry } from '../app/countriesSlice';
import { fetchHoliday, changeNoCode } from '../app/holidaySlice';
import { setIsDateTrue, setIsDateFalse } from '../app/todaySlice';
import  DarkMode from "./DarkMode/DarkMode";

const HomePage = () => {
    const dispatch = useDispatch();
    const holidayRetrieved = useSelector((state) => state.holiday.holidays);
    const countriesList = useSelector((state) => state.countries.countries);
    const today = useSelector((state) => state.today.isDate);
    const current = new Date();
    // const date = `2023-01-01`;
    const [loading, setLoading] = useState(false);
    const date = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
    
    
    const [showResults, setShowResults] = useState(false);
    useEffect(()=> {
        dispatch(fetchCountries());
    }, []);
    //Themes
    // useEffect(() => {
    //     // default theme change useEffect
    //     if(window.matchMedia('(prefers-color-scheme: dark)').matches){
    //         dispatch(setThemeDark());
    //     } else {
    //         dispatch(setThemeLight());
    //     }
    // }, [])
    // useEffect(() => {
    //     // button click theme change useEffect
    //     if (currentTheme === "dark") {
    //         document.documentElement.classList.add("dark");
    //     } else {
    //         document.documentElement.classList.remove("dark");
    //     }
    // }, [currentTheme]);
    
    const [holidayName, setHolidayName] = useState('');
    const [holidayPresent, setHolidayPresent] = useState(false);
    const isTodayAHoliday = () => {
        holidayRetrieved.map((holidate) => {
            if (holidate.date === date) {
                console.log(holidate.name);
                setHolidayName(holidate.name);
                setHolidayPresent(true);
                dispatch(setIsDateTrue());
                // {alert("Today is a public holiday!")}
                // console.log(todayIsAHoliday);
            } 
            else if(holidate.date !== date) {
                setLoading(false);
                if (holidate.date !== date) {
                    console.log(holidate.date);
                    setHolidayPresent(false);
                }
            }
        });
    }
    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            // skip first render
            isFirstRender.current = false;
        } else {
            console.log(today);
            Results();
        }
    }, [today]);

    // if there is a holiday today
    const Results = () => {
        if (today) {
            setLoading(false);
            setHolidayPresent(true);
        }
    }
    
    
    const noCode = useSelector(state => state.holiday.noCode);
    const [noCountryCode, setNoCountryCode] = useState(false);

    const isFirstRender1 = useRef(true);
    useEffect(() => {
        if (isFirstRender1.current) {
            // skip first render
            isFirstRender1.current = false;
        } else {
            console.log(holidayRetrieved);
            if (holidayRetrieved.length === 0) {
                setLoading(true);
                return
            } else {
                setNoCountryCode(false);
                isTodayAHoliday();
            }
        }
    }, [holidayRetrieved])

    const isFirstRender2 = useRef(true);
    useEffect(()=> {
        if (isFirstRender2.current) {
            // skip first render
            isFirstRender2.current = false;
        } else {
            console.log(noCode);
            setLoading(false)
            setNoCountryCode(true);
        }
    }, [noCode])
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
        setTypedText(firstLetter + input.slice(1));
        if (showResults) {
            setTypedText('');
        }
    };    
        
    const loks = () => {
        dispatch(setIsDateFalse())
        setLoading(true);
        setNoCountryCode(false);
        changeNoCode(false)
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
    }
    
    const [some, setSome] = useState(0);
    const selectedCountry = useSelector((state) => state.countries.selectedCountry);    
    const handleCountryChange = () => {
        console.log(selectedCountry);
        if (selectedCountry.code === "") {
            console.log("Chale");
            setLoading(false);
            setNoCountryCode(true);
        } else {
            dispatch(fetchHoliday(selectedCountry.code));
        }
    };


    useEffect(() => {
        //useEffect that runs the fxn because it's waiting for the selectedCountry value to change
        if (some === 1) {
            handleCountryChange();
        }
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
                    {showResults ? 
                    loading ? 
                    <p className='pt-3 pb-3'>Loading...</p> :
                    (noCountryCode && !today) || noCode ? 
                    <div className='justify-center text-center'>
                        <p className='pt-3 pb-3'>Chale, check another country wai</p>
                        <button onClick={() => {setShowResults(false)}} className='w-36 justify-center bg-gray-500 hover:bg-blue-700 text-gray-800 dark:text-white font-serif py-2 px-2 rounded-xl'>Change Country</button>
                    </div>
                     : 
                    <div>
                        <div className='justify-center text-center'>
                            { holidayPresent ? 
                            <div className='pt-3 pb-3'>
                                {"Yes, it's "}
                                <span className='text-red-600 font-extrabold'>{holidayName}</span> 
                                {" in " + selectedCountry.name}
                            </div>
                            : <p className='pt-3 pb-3'>No, Go to Work</p>}
                            <button onClick={() => {setShowResults(false)}} className='w-36 justify-center bg-gray-500 hover:bg-blue-700 text-gray-800 dark:text-white font-serif py-2 px-2 rounded-xl'>Change Country</button>
                        </div>
                    </div> 
                    : 
                    <div>
                        <p className='text-center p-3'>Choose a country: </p>
                        <form onSubmit={(event) => {
                            event.preventDefault(); // prevent form submission and page reload
                            loks();
                            setSome(1);
                            setShowResults(true);
                            // console.log(typedText);
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
                                {filteredOptions ? (
                                    <datalist id="countries" className="fixed top-8 w-full">
                                        {filteredOptions.map((option) => (
                                            <option key={option.key} value={option.value} />
                                        ))}
                                    </datalist>
                                ) : (
                                    <datalist id="countries" className="fixed top-8 w-full">
                                        {options.map((option) => (
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
                    } 
                </div>
            </div>
        </div>
    )
}

export default HomePage;