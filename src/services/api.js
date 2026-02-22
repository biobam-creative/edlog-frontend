// src/services/api.js
import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: "http://localhost:8000/api", //process.env.REACT_APP_API_URL ||
  // withCredentials: true, // Important for CSRF token and session cookies
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "JWT " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
    // X-CSRFToken: getCookie("csrftoken"),
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem("user");
    const userData = JSON.parse(user);
    const accessToken = userData.access_token;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log("no token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
