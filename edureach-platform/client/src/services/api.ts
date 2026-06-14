import axios from "axios";

const API_BASE_URL = ((import.meta.env.VITE_API_URL as string) || "http://localhost:5000/api").replace(/\/$/, "");

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "ECONNABORTED") {
      error.message = "The server is taking too long to respond. Please try again in a moment.";
    } else if (!error.response) {
      error.message = "Cannot reach the admission server right now. Please check the backend deployment.";
    }
    return Promise.reject(error);
  },
);

export default API;
