// 2. Open src/context/AuthContext.jsx
// Purpose: Manages user authentication state, login, registration, and logout across the application.

import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedInUser = async () => {
            const token = localStorage.getItem('sophia_token');
            if (token) {
                try {
                    const res = await api.get('/auth/me');
                    if (res.data.success) {
                        setUser(res.data.data);
                    }
                } catch (error) {
                    console.error('Session restore failed:', error);
                    localStorage.removeItem('sophia_token');
                }
            }
            setLoading(false);
        };

        checkLoggedInUser();
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        if (res.data.success) {
            const userData = res.data.data;
            localStorage.setItem('sophia_token', userData.token);
            setUser(userData);
            return userData;
        }
    };

    const register = async (formData) => {
        const res = await api.post('/auth/register', formData);
        if (res.data.success) {
            const userData = res.data.data;
            localStorage.setItem('sophia_token', userData.token);
            setUser(userData);
            return userData;
        }
    };

    const logout = () => {
        localStorage.removeItem('sophia_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

