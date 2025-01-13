function isAuthenticated() {
  const profile = localStorage.getItem("profile");
  return profile !== null;
};

function apiResponse(success, status, body) {
  return { success, status, body };
};

function getEndpointUri(endpoint) {
  return `${process.env.REACT_APP_API_URL}/api${endpoint}`;
}

async function apiPost(endpoint, body) {
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
      const errorData = await response.json();
      return apiResponse(false, response.status, errorData);
    }
  } catch (error) {
    console.error(`Error posting to ${endpointUri}: ${error.message}`);
    return apiResponse(false, 500, {});
  }
};

async function apiDelete(endpoint) {
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

async function apiGet(endpoint) {
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

async function apiPut(endpoint, body) {
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

async function apiPatch(endpoint, body) {
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

const apiUtil = { isAuthenticated, apiPost, apiDelete, apiGet, apiPut, apiPatch };

export default apiUtil;
