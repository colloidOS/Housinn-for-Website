import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";
import NProgress from "nprogress";
import "../styles/nprogress.css"; // Ensure this path is correct

// Create an Axios instance with the base URL
const api: AxiosInstance = axios.create({
  baseURL: "https://housinn.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Ensure this runs only on the client side
if (typeof window !== "undefined") {
  const token: string | undefined = Cookies.get("token");

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Token found and set in headers:", token);
  } else {
    console.error("No token found in localStorage.");
  }
}


// Add NProgress to monitor API requests
api.interceptors.request.use(
  (config) => {
    NProgress.start(); // Start the progress bar
    return config;
  },
  (error) => {
    NProgress.done(); // Stop the progress bar on error
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    NProgress.done(); // Stop the progress bar on success
    return response;
  },
  (error) => {
    NProgress.done(); // Stop the progress bar on error
    return Promise.reject(error);
  }
);

export default api;
