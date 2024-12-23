import apiUtil from "../util/apiUtil.js"

const logIntoAPI = async (idToken) => {
  const {success, body} = await apiUtil.apiPost("/v1/login", {token: idToken}, false);

  if (success) {
    return body;
  } else {
    // TODO handle failure to authenticate (401, 403, and other)
    return null;
  }
};

const logOutOfAPI = async () => {
    const { success } = apiUtil.apiDelete("/v1/login");
    
    return success;
}

const loginService = { logIntoAPI, logOutOfAPI};

export default loginService;
