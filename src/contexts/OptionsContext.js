import { createContext, useEffect, useState } from "react";
import apiUtil from "../util/apiUtil.js";
import { useNavigate } from "react-router-dom";

export const OptionsContext = createContext();

export const OptionsProvider = ({ children }) => {
    const navigate = useNavigate();
    const [options, setOptions] = useState(null);

    useEffect(() => {
        const getAllOptions = async() => {
            const response = await apiUtil.apiGet("/v1/options/all");

            if (!response.success && response.status === 401) {
                navigate("/sign-in");
            }

            setOptions(response.body);            
        }

        getAllOptions();
    }, [navigate]);

    return (
        <OptionsContext.Provider value={options}>
            {children}
        </OptionsContext.Provider>
    );
};
