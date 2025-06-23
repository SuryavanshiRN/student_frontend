// src/utils/axiosInstance.js
import axios from 'axios';

// ✅ Clean trailing slash if present to avoid double slashes in URLs
const rawBaseURL = process.env.REACT_APP_API_URL || 'https://student-backend-xk1k.onrender.com';
const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL.slice(0, -1) : rawBaseURL;

const instance = axios.create({
  baseURL: `${baseURL}/api`, // Final URL becomes https://your-backend/api
});

// ✅ Attach JWT token if it exists
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
