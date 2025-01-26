import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import localStoreUtil from '../util/localStoreUtil';

// Create a Context
const ColorModeContext = createContext();

// Define a provider component
export function ColorModeProvider({ children }) {
    ColorModeProvider.propTypes = {
        children: PropTypes.node.isRequired,
    }

    const [theme, setTheme] = useState('light');

    useEffect(() => {
        setTheme(localStoreUtil.getTheme());
    }, []);

    function toggleTheme() {
        const newTheme = localStoreUtil.getTheme() === "light" ? "dark" : "light";
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
