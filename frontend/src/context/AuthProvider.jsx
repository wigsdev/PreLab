import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
    const [tokens, setTokens] = useState(() => {
        const savedTokens = localStorage.getItem('auth_tokens');
        return savedTokens ? JSON.parse(savedTokens) : null;
    });

    const [user, setUser] = useState(null);
    // Initialize loading based on whether we have tokens to verify
    const [loading, setLoading] = useState(!!tokens);

    // Function to fetch the latest user data
    const fetchUser = async () => {
        try {
            const response = await api.get('/users/me/');
            setUser(response.data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            // If 401, mostly handled by interceptor or user remains null
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (tokens) {
            fetchUser();
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [tokens]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
                email,
                password,
            });

            const data = response.data;
            setTokens(data);
            localStorage.setItem('auth_tokens', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            return {
                success: false,
                error: error.response?.data?.detail || 'Error al iniciar sesión',
            };
        }
    };

    const logout = () => {
        setTokens(null);
        setUser(null);
        localStorage.removeItem('auth_tokens');
    };

    const value = {
        user,
        tokens,
        login,
        logout,
        loading,
        fetchUser,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
