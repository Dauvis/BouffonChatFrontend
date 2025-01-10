function getProfile() {
    return JSON.parse(localStorage.getItem("profile"));
}

function setProfile(profile) {
    localStorage.setItem("profile", JSON.stringify(profile));
}

function clearProfile() {
    localStorage.removeItem("profile");
}

const miscUtil = { getProfile, setProfile, clearProfile }

export default miscUtil;