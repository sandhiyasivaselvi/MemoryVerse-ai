import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

// Response interceptor for clean handling of errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMsg = error.response?.data?.error || error.message || 'An unexpected error occurred.';
    return Promise.reject(new Error(errorMsg));
  }
);

export default api;
