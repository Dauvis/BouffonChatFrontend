import apiUtil from "../util/apiUtil.js"

const logIntoAPI = async (idToken, navigate) => {
  const {success, body} = await apiUtil.apiPost("/v1/login", {token: idToken}, navigate);

  if (success) {
    return body;
  } else {
    // TODO handle failure to authenticate (401, 403, and other)
    return null;
  }
};

const logOutOfAPI = async (navigate) => {
    const { success } = apiUtil.apiDelete("/v1/login", navigate);
    
    return success;
}

const loginService = { logIntoAPI, logOutOfAPI};

export default loginService;
