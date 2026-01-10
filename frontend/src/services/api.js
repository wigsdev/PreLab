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
                    // console.log("🔑 Attaching Token:", tokens.access.substring(0, 10) + "...");
                    config.headers['Authorization'] = `Bearer ${tokens.access}`;
                }
            } catch (e) {
                console.error("❌ Error parsing auth_tokens:", e);
            }
        }

        // Allow browser to set Content-Type for FormData (multipart/form-data)
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type'];
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

export const getExamHistory = async () => {
    try {
        const response = await api.get('/history/');
        return response.data;
    } catch (error) {
        console.error("Error fetching exam history:", error);
        throw error;
    }
};

// No changes needed if we trust axios auto-detection for FormData
export const updateProfile = async (userData) => {
    try {
        const response = await api.patch('/users/me/', userData);
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

export const createQuestion = async (questionData) => {
    try {
        const response = await api.post('/questions/', questionData);
        return response.data;
    } catch (error) {
        console.error("Error creating question:", error);
        throw error;
    }
};

export default api;
