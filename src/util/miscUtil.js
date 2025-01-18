function getProfile() {
    return JSON.parse(localStorage.getItem("profile"));
}

function setProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
}

function clearProfile() {
    localStorage.removeItem("profile");
}

function setTrackedChatId(chatId) {
    sessionStorage.setItem("trackedChatId", chatId);
}

function getTrackedChatId()
{
    return sessionStorage.getItem("trackedChatId");
}

function setTheme(theme) {
    localStorage.setItem("theme", theme);
}

function getTheme(theme) {
    const curTheme = localStorage.getItem("theme");

    return curTheme || "light";
}

function getTemplateMRU() {
    return JSON.parse(localStorage.getItem("templateMRU"))
}

function addTemplateMRU(template) {
    const current = getTemplateMRU() || [];
    const filtered = current.filter(t => t.id !== template._id);
    const updated = ([{ id: template._id, name: template.name }, ...filtered]).slice(0, 10)
    localStorage.setItem("templateMRU", JSON.stringify(updated));
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

const miscUtil = { getProfile, setProfile, clearProfile, emptyTemplate, emptyChat, 
    setTheme, getTheme, setTrackedChatId, getTrackedChatId, getTemplateMRU, addTemplateMRU }

export default miscUtil;