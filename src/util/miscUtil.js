function getProfile() {
    return JSON.parse(localStorage.getItem("profile"));
}

function setProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
}

function clearProfile() {
    localStorage.removeItem("profile");
}

function chatLimitPercent(chat) {
    if (chat.model === "gpt-4o-mini") {
        return 100 * (chat.tokens / 25000);
    }

    if (chat.model === "gpt-40") {
        return 100 * (chat.tokens / 25000);
    }

    return 0;
}

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

const miscUtil = { getProfile, setProfile, clearProfile, emptyTemplate, emptyChat, chatLimitPercent }

export default miscUtil;