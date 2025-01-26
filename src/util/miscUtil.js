
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

function uniqueListFromArray(valueList, key) {
    if (!Array.isArray(valueList)) {
        throw new Error("Call to uniqueListFromArray called with a non-array");
    }

    return [...new Set(valueList.map(entry => entry[key]))];
}

const miscUtil = { emptyTemplate, emptyChat, stateAddOrReplace, uniqueListFromArray }

export default miscUtil;