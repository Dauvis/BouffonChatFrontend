import React, { createContext, useState, useContext, useEffect } from 'react';
import miscUtil from '../util/miscUtil';

// Create a Context
const ColorModeContext = createContext();

// Define a provider component
export const ColorModeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(miscUtil.getTheme());
  }, []);

  function toggleTheme() {
    const newTheme = miscUtil.getTheme() === "light" ? "dark" : "light";
    miscUtil.setTheme(newTheme);
    setTheme(newTheme);
  };

  return (
    <ColorModeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ColorModeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => {
    const context = useContext(ColorModeContext);
    if (!context) {
      throw new Error("useTheme must be used within a ColorModeProvider");
    }
    return context;
  };
  