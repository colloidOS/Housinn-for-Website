import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: "https://housinn.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Ensure this runs only on the client side
if (typeof window !== "undefined") {
  const token = Cookies.get("token");

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    console.log("Token found and set in headers:", token);
  } else {
    console.error("No token found in localStorage.");
  }
}

export default api;
