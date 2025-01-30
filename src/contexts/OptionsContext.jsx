import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import apiUtil from "../util/apiUtil";

export const OptionsContext = createContext();

export const OptionsProvider = ({ children }) => {
    OptionsProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };
    
    const [options, setOptions] = useState(null);

    useEffect(() => {
        async function getAllOptions() {
            const response = await apiUtil.get("/v1/options/all");

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
        return curModel?.label || "";
    }

    function findModel(model) {
        if (!model) {
            return null;
        }

        return options?.models ? options.models.find(o => o.value === model) : null;
    }

    return (
        <OptionsContext.Provider value={{ options, toneOptionsList, modelOptionsList, modelLabel, findModel }}>
            {children}
        </OptionsContext.Provider>
    );
};
