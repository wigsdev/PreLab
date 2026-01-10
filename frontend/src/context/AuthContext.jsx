import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState(() => {
        const savedTokens = localStorage.getItem('auth_tokens');
        return savedTokens ? JSON.parse(savedTokens) : null;
    });

    useEffect(() => {
        if (tokens) {
            try {
                // Decode token to get user info (email, id, etc.)
                const decoded = jwtDecode(tokens.access);
                setUser(decoded);

                // Configure axios interceptor if recommmanded
                // api.defaults.headers.common['Authorization'] = `Bearer ${tokens.access}`;
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }
        setLoading(false);
    }, [tokens]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
                email,
                password
            });

            const data = response.data;
            setTokens(data);
            localStorage.setItem('auth_tokens', JSON.stringify(data));

            const decoded = jwtDecode(data.access);
            setUser(decoded);

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
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
