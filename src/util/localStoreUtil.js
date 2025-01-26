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

function getTheme() {
    const curTheme = localStorage.getItem("theme");

    return curTheme || "light";
}

function getTemplateMRU() {
    const profile = getProfile();
    return profile.templateMRU || [];
}

function setTemplateMRU(mru) {
    const profile = getProfile();
    profile.templateMRU = mru;
    setProfile(profile);
}

const localStoreUtil = { getProfile, setProfile, clearProfile, setTheme, getTheme, 
    setTrackedChatId, getTrackedChatId, getTemplateMRU, setTemplateMRU};

export default localStoreUtil;