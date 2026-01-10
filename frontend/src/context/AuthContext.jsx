import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import api from '../services/api'; // Use our configured api instance

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState(() => {
        const savedTokens = localStorage.getItem('auth_tokens');
        return savedTokens ? JSON.parse(savedTokens) : null;
    });

    // Function to fetch the latest user data
    const fetchUser = async () => {
        try {
            const response = await api.get('/users/me/');
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            // If fetch fails (e.g., 401), might want to logout
            // logout(); 
        }
    };

    useEffect(() => {
        if (tokens) {
            fetchUser();
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [tokens]);

    const login = async (email, password) => {
        try {
            // Login to get tokens
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
                email,
                password
            });

            const data = response.data;
            setTokens(data);
            localStorage.setItem('auth_tokens', JSON.stringify(data));

            // Immediately fetch user data
            // We use the raw axios call for login, but fetchUser uses 'api' instance
            // which reads from localStorage. Since `useEffect` on `tokens` will triggger,
            // we technically don't need to call it here, but `useEffect` might be async/later.
            // Let's rely on useEffect [tokens] to trigger the fetch.

            return { success: true };
        } catch (error) {
            console.error("Login failed:", error);
            return {
                success: false,
                error: error.response?.data?.detail || "Error al iniciar sesión"
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
        fetchUser // Expose this so ProfileView can call it
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
