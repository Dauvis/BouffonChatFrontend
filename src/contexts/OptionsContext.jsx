import { createContext, useEffect, useState } from "react";
import apiUtil from "../util/apiUtil.js";
import PropTypes from "prop-types";

export const OptionsContext = createContext();

export const OptionsProvider = ({ children }) => {
    const [options, setOptions] = useState(null);

    OptionsProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };

    useEffect(() => {
        const getAllOptions = async () => {
            const response = await apiUtil.apiGet("/v1/options/all");

            if (response.success) {
                setOptions(response.body);
            }
        }

        getAllOptions();
    }, []);

    function toneOptionsList() {
        return (options?.tones || []).map(entry => (
            <option key={entry} value={entry}>{entry}</option>
        ));
    }

    function modelOptionsList() {
        return (options?.models || []).map(entry => (
            <option key={entry.value} value={entry.value}>{entry.label}</option>
        ));
    }

    function modelLabel(model) {
        if (!model) {
            return "";
        }

        const curModel = options?.models ? options.models.find(o => o.value === model) : null;
        return curModel?.label || '';
    }

    return (
        <OptionsContext.Provider value={{ options, toneOptionsList, modelOptionsList, modelLabel }}>
            {children}
        </OptionsContext.Provider>
    );
};
