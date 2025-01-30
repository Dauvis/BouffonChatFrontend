import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Create a Context
const OverlayContext = createContext();
let setOverlayVisible = null;

// Define a provider component
export function OverlayProvider({ children }) {
    OverlayProvider.propTypes = {
        children: PropTypes.node.isRequired,
    }

    const [overlayVisibility, setOverlayVisibility] = useState(false);
    setOverlayVisible = setOverlayVisibility;

    return (
        <OverlayContext.Provider value={{ overlayVisibility, setOverlayVisibility }}>
            {children}
        </OverlayContext.Provider>
    );
};

export function showOverlay() {
    if (setOverlayVisible) {
        setOverlayVisible(true);
    }
}

export function hideOverlay() {
    if (setOverlayVisible) {
        setOverlayVisible(false);
    }
}

// Custom hook for using the theme context
export function useOverlay() {
    const context = useContext(OverlayContext);

    if (!context) {
        throw new Error("useOverlay must be used within a OverlayProvider");
    }
    
    return context;
};
