import axios from 'axios';

// Connection state management
let isConnectionEnabled = true;

// Create an axios instance with the base URL of the Next.js backend
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor for authentication tokens
api.interceptors.request.use(
  (config) => {
    // Check if connection is enabled
    if (!isConnectionEnabled) {
      // Reject the request with a custom error
      return Promise.reject(new Error('API connection is currently disabled'));
    }
    
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Connection control functions
export const enableConnection = () => {
  isConnectionEnabled = true;
  return isConnectionEnabled;
};

export const disableConnection = () => {
  isConnectionEnabled = false;
  return isConnectionEnabled;
};

export const toggleConnection = () => {
  isConnectionEnabled = !isConnectionEnabled;
  return isConnectionEnabled;
};

export const getConnectionStatus = () => {
  return isConnectionEnabled;
};

export default api;
