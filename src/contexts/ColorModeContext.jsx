import { createContext, useState, useContext, useEffect } from 'react';
import miscUtil from '../util/miscUtil';
import PropTypes from 'prop-types';
import localStoreUtil from '../util/localStoreUtil';

// Create a Context
const ColorModeContext = createContext();

// Define a provider component
export function ColorModeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  ColorModeProvider.propTypes = {
    children: PropTypes.node.isRequired,
  }

  useEffect(() => {
    setTheme(localStoreUtil.getTheme());
  }, []);

  function toggleTheme() {
    const newTheme = miscUtil.getTheme() === "light" ? "dark" : "light";
    localStoreUtil.setTheme(newTheme);
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
  