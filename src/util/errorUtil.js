/**
 * wraps API error information for error handling logic in components
 * @param {object} errorResponse 
 * @param {string} newRedirect 
 * @param {number} status 
 * @param {string} code 
 * @param {string} message 
 * @returns error information object
 */
function handleApiError(errorResponse, newRedirect = "", status = 0, code = "", message = "") {
    const overrideStatus = status || errorResponse.status;
    const overrideCode = code || errorResponse.body.errorCode;
    const overrideMessage = message || errorResponse.body.message;

    const redirect = newRedirect || redirectTo(overrideStatus, overrideCode);
    const args = { status: overrideStatus, code: overrideCode, message: overrideMessage};

    return { redirect, args};
}

/**
 * wraps general error information for error handling logic in components
 * @param {string} code 
 * @param {string} message 
 * @param {string} newRedirect 
 * @returns 
 */
function handleInternalError(code, message, newRedirect = "") {
    const redirect = newRedirect || redirectTo(null, code);
    const args = { code, message };

    return { redirect, args }
}

/**
 * handles logic for determining page to which an error should redirect
 * @param {number} status 
 * @param {string} code 
 * @returns name of page for redirection
 */
function redirectTo(status, code) {
    if ((!status || status === 401 || status === 403) && (code === "NotAuthenticated" || code === "NotAuthorized")) {
        return "/sign-in";
    }

    return "/error";
}

const errorUtil = { handleApiError, handleInternalError };

export default errorUtil;