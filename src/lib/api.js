// utils/api.js

import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: 'https://housinn.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can also add interceptors here for request or response

export default api;
