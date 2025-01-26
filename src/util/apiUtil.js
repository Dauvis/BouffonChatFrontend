import localStoreUtil from "./localStoreUtil";

/**
 * helper function to indicate user is logged in
 * 
 * Note: A true result does not necessiarly mean that
 * the user is authenticated or authorized by the
 * backend API.
 * @returns true if the user is logged in
 */
function isAuthenticated() {
    const profile = localStoreUtil.getProfile();
    return profile !== null;
};

/**
 * Wraps information coming from the backend API
 * @param {boolean} success 
 * @param {number} status 
 * @param {object} body 
 * @returns API response information wrapped in an object
 */
function apiResponse(success, status, body) {
    return { success, status, body };
};

/**
 * Determines full URI for an API endpoint
 * @param {string} endpoint 
 * @returns full URI of endpoint
 */
function getEndpointUri(endpoint) {
    return `${import.meta.env.VITE_URL}/api${endpoint}`;
}

/**
 * Performs a POST request with the API
 * @param {string} endpoint 
 * @param {object} body 
 * @returns API call response object
 */
async function post(endpoint, body) {
    const endpointUri = getEndpointUri(endpoint);

    try {
        const response = await fetch(endpointUri, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data = response.status === 204 ? {} : await response.json();
            return apiResponse(true, response.status, data);
        } else {
            const errorData = await response.json();
            return apiResponse(false, response.status, errorData);
        }
    } catch (error) {
        console.error(`Error posting to ${endpointUri}: ${error.message}`);
        return apiResponse(false, 500, {});
    }
};

/**
 * performs a DELETE request with the API
 * @param {string} endpoint 
 * @returns API call response object
 */
async function remove(endpoint) {
    const endpointUri = getEndpointUri(endpoint);

    try {
        const response = await fetch(endpointUri, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });

        return apiResponse(response.ok, response.status, {});
    } catch (error) {
        console.error(`Error deleting resource ${endpointUri}: ${error.message}`);
        return apiResponse(false, 500, {});
    }
};

/**
 * performs GET request with the API
 * @param {string} endpoint 
 * @returns API call response object
 */
async function get(endpoint) {
    const endpointUri = getEndpointUri(endpoint);

    try {
        const response = await fetch(endpointUri, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return apiResponse(true, response.status, data);
        } else {
            const errorData = await response.json();
            return apiResponse(false, response.status, errorData);
        }
    } catch (error) {
        console.error(`Error fetching resource ${endpointUri}: ${error.message}`);
    }
}

/**
 * performs PUT request with API
 * @param {string} endpoint 
 * @param {object} body 
 * @returns API call response object
 */
async function put(endpoint, body) {
    const endpointUri = getEndpointUri(endpoint);

    try {
        const response = await fetch(endpointUri, {
            method: "PUT",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data = response.status === 204 ? {} : await response.json();
            return apiResponse(true, response.status, data);
        } else {
            const errorData = await response.json();
            return apiResponse(false, response.status, errorData);
        }
    } catch (error) {
        console.error(`Error putting to ${endpointUri}: ${error.message}`);
        return apiResponse(false, 500, {});
    }
};

/**
 * performs a PATCH request with the API
 * @param {string} endpoint 
 * @param {object} body 
 * @returns API call response object
 */
async function patch(endpoint, body) {
    const endpointUri = getEndpointUri(endpoint);

    try {
        const response = await fetch(endpointUri, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data = response.status === 204 ? {} : await response.json();
            return apiResponse(true, response.status, data);
        } else {
            const errorData = await response.json();
            return apiResponse(false, response.status, errorData);
        }
    } catch (error) {
        console.error(`Error putting to ${endpointUri}: ${error.message}`);
        return apiResponse(false, 500, {});
    }
};

const apiUtil = { isAuthenticated, post, remove, get, put, patch };

export default apiUtil;
