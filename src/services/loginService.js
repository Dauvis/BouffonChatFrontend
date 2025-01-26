import apiUtil from "../util/apiUtil"

/**
 * Authenticates user with API using Google token
 * @param {string} idToken 
 * @returns response object from API call
 */
async function logIntoAPI(idToken) {
  const response = await apiUtil.post("/v1/login", {token: idToken});

  return response;
};

/**
 * Logs user out of API
 * @returns true if log out operation was successful
 */
async function logOutOfAPI() {
    const response = await apiUtil.remove("/v1/login");
    
    return response.success;
}

const loginService = { logIntoAPI, logOutOfAPI};

export default loginService;
