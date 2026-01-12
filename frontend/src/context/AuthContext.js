import { createContext, useContext } from 'react';

export const AuthContext = createContext({
    user: null,
    tokens: null,
    login: () => {},
    logout: () => {},
    loading: true,
    fetchUser: () => {},
});

export const useAuth = () => useContext(AuthContext);
