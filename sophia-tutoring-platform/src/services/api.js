// API Client & Auth Context (api.js & AuthContext.jsx)
// 🟢 Part 1: API Client & Auth Context
// Purpose: Creates an Axios instance that automatically attaches your JWT token to API requests.

import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Automatically attach JWT token from localStorage if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('sophia_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
