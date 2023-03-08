import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHoliday } from '../app/holidaySlice';
import { toggleTheme, setThemeDark, setThemeLight } from '../app/themeSlice';
import  DarkMode from "./DarkMode/DarkMode";

const HomePage = () => {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const holidayRetrieved = useSelector((state) => state.holiday.holidays)

    useEffect(()=> {
        dispatch(fetchHoliday());
    }, [])
    useEffect(() => {
        console.log(holidayRetrieved);
    }, [holidayRetrieved])

    useEffect(() => {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
        dispatch(setThemeDark());
        }
        else {
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

  return (
    <div>
        <div className="flex justify-center items-center fixed top-10 right-10">
            <DarkMode />
        </div>
        <div className='flex justify-center items-center mt-48'>
            <p>This is the New WOrld ORder</p>
        </div>
    </div>
  )
}

export default HomePage;