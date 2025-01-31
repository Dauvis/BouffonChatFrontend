/**
 * retrieves user profile information
 * @returns profile
 */
function getProfile() {
    return JSON.parse(localStorage.getItem("profile"));
}

/**
 * stores user profile information
 * @param {object} profile 
 */
function setProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
}

/**
 * removes user profile information
 */
function clearProfile() {
    localStorage.removeItem("profile");
}

/**
 * tracks current selected chat
 * 
 * Note: this chat identifier should not be considered as
 * the chat selected by the user. For that, use activeChat
 * on the ChatDataContext. This is for detecting whether or
 * not the user changed chats while the API is still 
 * processing a message to the AI API.
 * @param {string} chatId 
 */
function setTrackedChatId(chatId) {
    sessionStorage.setItem("trackedChatId", chatId);
}

/**
 * gets current selected chat
 * 
 * Note: see note for setTrackedChatId()
 * @returns tracked chat identifier
 */
function getTrackedChatId()
{
    return sessionStorage.getItem("trackedChatId");
}

/**
 * set the current Bootstrap theme
 * @param {string} theme 
 */
function setTheme(theme) {
    localStorage.setItem("theme", theme);
}

/**
 * gets the current Bootstrap theme
 * @returns theme name
 */
function getTheme() {
    const curTheme = localStorage.getItem("theme");

    return curTheme || "light";
}

/**
 * fetchs the user's current MRU for templates
 * @returns abridged list of templates in MRU
 */
function getTemplateMRU() {
    const profile = getProfile();
    return profile.templateMRU || [];
}

/**
 * sets the user's current MRU for templates
 * @param {array} mru 
 */
function setTemplateMRU(mru) {
    const profile = getProfile();
    profile.templateMRU = mru;
    setProfile(profile);
}

function lockScroll(lock = null) {
    if (lock == null) {
        return Number(sessionStorage.getItem("scrollLock"));
    } else {
        sessionStorage.setItem("scrollLock", lock.toString());
    }
}

const localStoreUtil = { getProfile, setProfile, clearProfile, setTheme, getTheme, 
    setTrackedChatId, getTrackedChatId, getTemplateMRU, setTemplateMRU, lockScroll};

export default localStoreUtil;