const isAuthenticated = () => {
  const profile = localStorage.getItem("profile");
  return profile !== null;
};

const apiResponse = (success, status, body) => {
  return { success, status, body };
};

const getEndpointUri = (endpoint) => {
    return `${process.env.REACT_APP_API_URL}/api${endpoint}`;
}

const apiPost = async (endpoint, body) => {
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

const apiUtil = { isAuthenticated, apiPost, apiDelete }; 

export default apiUtil;
