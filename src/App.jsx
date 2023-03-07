import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, setThemeDark, setThemeLight } from './app/themeSlice';
import  DarkMode from "../src/app/DarkMode/DarkMode";

function App() {
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
    <div className='App'>
        <DarkMode />
      <div className="h-screen bg-white dark:bg-black w-full">

      <button 
        className="bg-white dark:bg-blue-600 p-4 rounded-full flex justify-center items-center fixed top-10 right-10 shadow-md"
        onClick={handleThemeSwitch}
      >
        Dark Mode
      </button>

      </div>
    </div>
  );
}

export default App;