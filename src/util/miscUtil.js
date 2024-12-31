function getProfile() {
    return JSON.parse(localStorage.getItem("profile"));
}

const miscUtil = {getProfile}

export default miscUtil;