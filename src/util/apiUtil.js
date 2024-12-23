import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
  const token = sessionStorage.getItem("key");

  if (!token) {
    return false;
  }

  const tokenClaims = jwtDecode(token);

  if (tokenClaims && tokenClaims.exp) {
    const expTime = tokenClaims.exp * 1000;
    const curTime = Date.now();
    return curTime < expTime;
  }

  return false;
};

const refreshAccess = async () => {
    const curToken = sessionStorage.getItem("key");

    if (!curToken) {
        return false;
    }

    const { success, body} = await apiPost('/v1/login/refresh', {}, false);

    if (success) {
        const token = body.token;
        sessionStorage.setItem("key", token);
        return true;
    }

    return false;
};

const apiResponse = (success, status, body) => {
  return { success, status, body };
};

const getEndpointUri = (endpoint) => {
    return `${process.env.REACT_APP_API_URL}/api${endpoint}`;
}

const refreshAccessIfNeeded = async () => {
    return isAuthenticated() || await refreshAccess();
  };

const apiPost = async (endpoint, body, isProtected = true) => {
  const endpointUri = getEndpointUri(endpoint);

  try {
    if (isProtected && !refreshAccessIfNeeded()) {
      return apiResponse(false, 401, {});
    }

    const token = sessionStorage.getItem("key");
    const response = await fetch(endpointUri, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      return apiResponse(true, response.status, data);
    } else {
      return apiResponse(false, response.status, {});
    }
  } catch (error) {
    console.error(`Error posting to ${endpointUri}: ${error.message}`);
    return apiResponse(false, 500, {});
  }
};

const apiDelete = async (endpoint, isProtected = true) => {
    const endpointUri = getEndpointUri(endpoint);

  try {
    if (isProtected && !refreshAccessIfNeeded()) {
        return apiResponse(false, 401, {});
    }
  
    const token = sessionStorage.getItem("key");
    const response = await fetch(endpointUri, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    return apiResponse(response.ok, response.status, {});
  } catch (error) {
    console.error(`Error deleting resource ${endpointUri}: ${error.message}`);
    return apiResponse(false, 500, {});
  }
};

const apiUtil = { isAuthenticated, refreshAccess, apiPost, apiDelete }; 

export default apiUtil;
