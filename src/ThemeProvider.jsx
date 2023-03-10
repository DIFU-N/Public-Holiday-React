import React, { createContext, useState } from 'react';
import { lightTheme, darkTheme } from './theme';
import { useSelector, connect } from "react-redux";

export const ThemeContext = createContext();

//not really a prop but a context.
function ThemeProvider({ children }) {
    const theme = useSelector((state) =>  state.theme.currentTheme);
//   const [theme, setTheme] = useState('light');

//   const toggleTheme = () => {
//     console.log('toggleTheme called');
//     setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

// let style = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeContext.Provider value={{ theme }}>
      <div className='w-full border' style={{
        background: theme === 'light' ? lightTheme.colors.background : darkTheme.colors.background,
        color: theme === 'light' ? lightTheme.colors.text : darkTheme.colors.text,
        fontFamily: darkTheme.colors.font,
        }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;