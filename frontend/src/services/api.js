import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para incluir el token en cada petición
api.interceptors.request.use(
    (config) => {
        console.log("🔍 API Interceptor Running for:", config.url);
        const storedTokens = localStorage.getItem('auth_tokens');

        if (storedTokens) {
            try {
                const tokens = JSON.parse(storedTokens);
                if (tokens?.access) {
                    console.log("🔑 Attaching Token:", tokens.access.substring(0, 10) + "...");
                    config.headers['Authorization'] = `Bearer ${tokens.access}`;
                } else {
                    console.warn("⚠️ Tokens parsed but no 'access' property found:", tokens);
                }
            } catch (e) {
                console.error("❌ Error parsing auth_tokens:", e);
            }
        } else {
            console.warn("⚠️ No 'auth_tokens' found in localStorage");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const saveExamResult = async (examData) => {
    try {
        const response = await api.post('/history/', examData);
        return response.data;
    } catch (error) {
        console.error("Error saving exam result:", error);
        throw error; // Re-lanzar para manejar en el componente
    }
};

export default api;
