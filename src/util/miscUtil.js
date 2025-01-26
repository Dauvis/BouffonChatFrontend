
const emptyTemplate = {
    _id: '',
    name: '',
    description: '',
    category: '',
    tone: '',
    model: '',
    instructions: '',
    notes: ''
};

const emptyChat = {
    _id: '',
    type: '',
    name: '',
    tone: '',
    instructions: '',
    notes: '',
    tokens: 0,
    model: '',
    systemMessage: '',
    owner: '',
    lastActivity: 0,
    exchanges: []
}

/**
 * adds or replaces a value in an array based state
 * @param {array} state 
 * @param {function} setState 
 * @param {object} value 
 * @param {string} key 
 */
function stateAddOrReplace(state, setState, value, key) {
    if (!Array.isArray(state)) {
        throw new Error("Call to stateAddOrReplace called with a non-array state");
    }

    if (typeof value !== 'object' || value === null) {
        throw new Error("Call to stateAddOrReplace called with non-object or null");
    }

    if (state.some(t => t[key] === value[key])) {
        setState((prev) => (
            prev.map(t => (t[key] === value[key] ? value : t))
        ));
    } else {
        setState((prev) => [...prev, value]);
    }
}

/**
 * generates a unique list of values for a property in an array
 * @param {array} valueList 
 * @param {string} key 
 * @returns array of unique valus for property
 */
function uniqueListFromArray(valueList, key) {
    if (!Array.isArray(valueList)) {
        throw new Error("Call to uniqueListFromArray called with a non-array");
    }

    return [...new Set(valueList.map(entry => entry[key]))];
}

/**
 * adds or replaces a value in an array
 * @param {array} valueList 
 * @param {object} value 
 * @param {string} key 
 * @returns array with value added or replaced
 */
function addOrReplaceInArray(valueList, value, key) {
    if (!Array.isArray(valueList)) {
        throw new Error("Call to addOrReplaceInArray called with a non-array");
    }

    if (valueList.some(v => v[key] === value[key])) {
        return valueList.map(v => (v[key] === value[key] ? value : v));
    } else {
        return [...valueList, value];
    }
}

/**
 * removes value from array
 * @param {array} valueList 
 * @param {any} value
 * @param {string} key 
 * @returns array with value removed
 */
function removeFromArray(valueList, value, key) {
    if (!Array.isArray(valueList)) {
        throw new Error("Call to removeFromArray called with a non-array");
    }

    const isObject = (typeof value === 'object');

    if (isObject) {
        return valueList.filter(v => v[key] !== value[key]);
    } else {
        return valueList.filter(v => v[key] !== value);
    }
}

const miscUtil = { emptyTemplate, emptyChat, stateAddOrReplace, uniqueListFromArray, addOrReplaceInArray, removeFromArray }

export default miscUtil;