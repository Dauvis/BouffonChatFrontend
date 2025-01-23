
function handleApiError(errorResponse, newRedirect = "", status = 0, code = "", message = "") {
    const overrideStatus = status || errorResponse.status;
    const overrideCode = code || errorResponse.body.errorCode;
    const overrideMessage = message || errorResponse.body.message;

    const redirect = newRedirect || redirectTo(overrideStatus, overrideCode);
    const args = { status: overrideStatus, code: overrideCode, message: overrideMessage};

    return { redirect, args};
}

function handleInternalError(code, message, newRedirect = "") {
    const redirect = newRedirect || redirectTo(null, code);
    const args = { code, message };

    return { redirect, args }
}

function redirectTo(status, code) {
    if ((!status || status === 401 || status === 403) && (code === "NotAuthenticated" || code === "NotAuthorized")) {
        return "/sign-in";
    }

    return "/error";
}

const errorUtil = { handleApiError, handleInternalError };

export default errorUtil;