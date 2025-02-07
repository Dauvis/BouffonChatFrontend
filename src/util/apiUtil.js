import localStoreUtil from "./localStoreUtil";
import { showOverlay, hideOverlay } from "../contexts/OverlayContext";

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
 * @param {string} filename
 * @returns API response information wrapped in an object
 */
function apiResponse(success, status, body, filename = null) {
    return { success, status, body, filename };
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
async function post(endpoint, body, useOverlay = true) {
    const endpointUri = getEndpointUri(endpoint);

    const overlayTimeout = useOverlay ? 
        setTimeout(() => { showOverlay(); }, 2000 )
        : null;

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
    } finally {
        if (overlayTimeout) clearTimeout(overlayTimeout);
        hideOverlay();
    }
};

async function postFormData(endpoint, body, useOverlay = true) {
    const endpointUri = getEndpointUri(endpoint);

    const overlayTimeout = useOverlay ? 
        setTimeout(() => { showOverlay(); }, 2000 )
        : null;

    try {
        const response = await fetch(endpointUri, {
            method: "POST",
            credentials: 'include',
            body
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
    } finally {
        if (overlayTimeout) clearTimeout(overlayTimeout);
        hideOverlay();
    }
};

async function postGetBlob(endpoint, body, useOverlay = true) {
    const endpointUri = getEndpointUri(endpoint);

    const overlayTimeout = useOverlay ? 
        setTimeout(() => { showOverlay(); }, 2000 )
        : null;

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
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = 'exported_data.zip';

            console.log(contentDisposition);
        
            if (contentDisposition && contentDisposition.includes('filename=')) {
                const match = contentDisposition.match(/filename="([^"]+)"/);
                filename = match ? match[1] : filename;
            }

            const reader = response.body.getReader();
            const stream = new ReadableStream({
                start(controller) {
                    function push() {
                        reader.read().then(({ done, value }) => {
                            if (done) {
                                controller.close();
                                return;
                            }
                            controller.enqueue(value);
                            push();
                        });
                    }
                    push();
                }
            });
        
            const blob = await new Response(stream).blob();            
            return apiResponse(true, response.status, blob, filename);
        } else {
            const errorData = await response.json();
            return apiResponse(false, response.status, errorData);
        }
    } catch (error) {
        console.error(`Error posting to ${endpointUri}: ${error.message}`);
        return apiResponse(false, 500, {});
    } finally {
        if (overlayTimeout) clearTimeout(overlayTimeout);
        hideOverlay();
    }
};

/**
 * performs a DELETE request with the API
 * @param {string} endpoint 
 * @returns API call response object
 */
async function remove(endpoint, useOverlay = true) {
    const endpointUri = getEndpointUri(endpoint);

    const overlayTimeout = useOverlay ? 
        setTimeout(() => { showOverlay(); }, 2000 )
        : null;

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
    } finally {
        if (overlayTimeout) clearTimeout(overlayTimeout);
        hideOverlay();
    }
};

/**
 * performs GET request with the API
 * @param {string} endpoint 
 * @returns API call response object
 */
async function get(endpoint, useOverlay = true) {
    const endpointUri = getEndpointUri(endpoint);

    const overlayTimeout = useOverlay ? 
        setTimeout(() => { showOverlay(); }, 2000 )
        : null;

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
    } finally {
        if (overlayTimeout) clearTimeout(overlayTimeout);
        hideOverlay();
    }
}

/**
 * performs PUT request with API
 * @param {string} endpoint 
 * @param {object} body 
 * @returns API call response object
 */
async function put(endpoint, body, useOverlay = true) {
    const endpointUri = getEndpointUri(endpoint);

    const overlayTimeout = useOverlay ? 
        setTimeout(() => { showOverlay(); }, 2000 )
        : null;

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
    } finally {
        if (overlayTimeout) clearTimeout(overlayTimeout);
        hideOverlay();
    }
};

/**
 * performs a PATCH request with the API
 * @param {string} endpoint 
 * @param {object} body 
 * @returns API call response object
 */
async function patch(endpoint, body, useOverlay = true) {
    const endpointUri = getEndpointUri(endpoint);

    const overlayTimeout = useOverlay ? 
        setTimeout(() => { showOverlay(); }, 2000 )
        : null;

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
    } finally {
        if (overlayTimeout) clearTimeout(overlayTimeout);
        hideOverlay();
    }
};

const apiUtil = { isAuthenticated, post, remove, get, put, patch, postGetBlob, postFormData };

export default apiUtil;
