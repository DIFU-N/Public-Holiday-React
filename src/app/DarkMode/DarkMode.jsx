import React, { useEffect } from "react";
import Sun from "./Sun.jsx";
import Moon from "./Moon.jsx";
import "./DarkMode.css";
import { toggleTheme, setThemeDark, setThemeLight } from '../themeSlice';
import { useDispatch, useSelector } from 'react-redux';


const DarkMode = () => {
    const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.currentTheme);

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

  const handleThemeSwitch = () => {
    dispatch(toggleTheme())
  };

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={handleThemeSwitch}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                <Sun />
                <Moon />
            </label>
        </div>
    );
};

export default DarkMode;
