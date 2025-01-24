import apiUtil from "../util/apiUtil.js"

async function logIntoAPI(idToken) {
  const response = await apiUtil.apiPost("/v1/login", {token: idToken});

  return response;
};

async function logOutOfAPI() {
    const response = apiUtil.apiDelete("/v1/login");
    
    return response.success;
}

const loginService = { logIntoAPI, logOutOfAPI};

export default loginService;
