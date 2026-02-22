import axios from "axios";
// import { toast } from "react-toastify";
// import jwtDecode from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 40000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
    // X-CSRFToken: getCookie("csrftoken"),
  },
});

api.interceptors.response.use(
  (response) => response,
  async function (error) {
    const originalRequest = error.config;
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    if (!expectedError) {
      consloe.error("An unexpected error occurred.");
      return Promise.reject(error);
    }

    if (isTokenRefreshError(error, originalRequest)) {
      console.error("Token refresh error:", error.response);
      // window.location.href = "/login";
      return Promise.reject(error);
    }

    if (isUnauthorizedError(error) || isTokenNotValidError(error)) {
      return handleTokenRefresh(originalRequest);
    }

    return Promise.reject(error);
  }
);

function isTokenRefreshError(error, originalRequest) {
  return (
    error.response.data.code !== "token_not_valid" &&
    error.response.status === 401 &&
    error.response.statusText === "Unauthorized" &&
    originalRequest.url === config.apiUrl + "token/refresh/"
  );
}

function isUnauthorizedError(error) {
  return (
    error.response.data.code !== "token_not_valid" &&
    error.response.status === 401 &&
    error.response.statusText === "Unauthorized"
  );
}

function isTokenNotValidError(error) {
  return (
    error.response.data.code === "token_not_valid" &&
    error.response.status === 401 &&
    error.response.statusText === "Unauthorized"
  );
}

async function handleTokenRefresh(originalRequest) {
  const refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken) {
    const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));
    const now = Math.ceil(Date.now() / 1000);

    if (tokenParts.exp > now) {
      try {
        const response = await axios.post(`${config.apiUrl}/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        httpHeader.defaults.headers["Authorization"] =
          "JWT " + response.data.access;
        originalRequest.headers["Authorization"] =
          "JWT " + response.data.access;

        return axios(originalRequest);
      } catch (err) {
        console.error("Error refreshing token:", err);
        window.location.href = "/login";
      }
    } else {
      console.log("Refresh token is expired", tokenParts.exp, now);
      window.location.href = "/login";
    }
  } else {
    console.log("Refresh token is not available");
    window.location.href = "/login";
  }
}

export default api;
