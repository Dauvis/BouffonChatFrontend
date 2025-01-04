import { createContext, useEffect, useState } from "react";
import apiUtil from "../../util/apiUtil";

export const OptionsContext = createContext();

export const OptionsProvider = ({ children }) => {
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const getAllOptions = async() => {
            const response = await apiUtil.apiGet("/v1/options/all");
            setOptions(response.body);            
        }

        getAllOptions();
    }, []);

    return (
        <OptionsContext.Provider value={options}>
            {children}
        </OptionsContext.Provider>
    );
};
