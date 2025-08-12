// src/utils/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

instance.interceptors.request.use(
  (config) => {
    // Skip auth header for registration and login endpoints only
    const isRegisterOrLogin = config.url === '/api/users' || 
                              config.url === '/api/users/login' || 
                              config.url?.includes('/api/auth/');
    
    if (!isRegisterOrLogin) {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
