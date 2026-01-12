import axios from 'axios';

const getApiUrl = () => {
    // Debug Production Values
    console.log('🔍 [Debug] Env Vars:', {
        VITE_API_URL: import.meta.env.VITE_API_URL,
        MODE: import.meta.env.MODE,
        PROD: import.meta.env.PROD,
        BASE_URL: import.meta.env.BASE_URL,
    });

    // 1. Priority: Explicit Environment Variable (Render / .env)
    if (import.meta.env.VITE_API_URL) {
        return `${import.meta.env.VITE_API_URL}/api`;
    }

    // 2. Fallback: Production Environment (Automatic Render URL prediction)
    // Useful if VITE_API_URL fails to load in build context
    if (import.meta.env.PROD) {
        console.warn('⚠️ using hardcoded prod fallback');
        return 'https://prelab-backend.onrender.com/api';
    }

    // 3. Default: Local Development
    return 'http://127.0.0.1:8000/api';
};

const API_URL = getApiUrl();

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para incluir el token en cada petición
api.interceptors.request.use(
    (config) => {
        console.log('🔍 API Interceptor Running for:', config.url);
        const storedTokens = localStorage.getItem('auth_tokens');

        if (storedTokens) {
            try {
                const tokens = JSON.parse(storedTokens);
                if (tokens?.access) {
                    // console.log("🔑 Attaching Token:", tokens.access.substring(0, 10) + "...");
                    config.headers['Authorization'] = `Bearer ${tokens.access}`;
                }
            } catch (e) {
                console.error('❌ Error parsing auth_tokens:', e);
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
        console.error('Error saving exam result:', error);
        throw error; // Re-lanzar para manejar en el componente
    }
};

export const getExamHistory = async () => {
    try {
        const response = await api.get('/history/');
        return response.data;
    } catch (error) {
        console.error('Error fetching exam history:', error);
        throw error;
    }
};

export const getExamAttempt = async (id) => {
    try {
        const response = await api.get(`/history/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching exam attempt:', error);
        throw error;
    }
};

export const createReport = async (reportData) => {
    try {
        await api.post('/reports/', reportData);
    } catch (error) {
        console.error('Error creating report:', error);
        throw error;
    }
};

// No changes needed if we trust axios auto-detection for FormData
export const updateProfile = async (userData) => {
    try {
        const response = await api.patch('/users/me/', userData);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
};

export const createQuestion = async (questionData) => {
    try {
        const response = await api.post('/questions/', questionData);
        return response.data;
    } catch (error) {
        console.error('Error creating question:', error);
        throw error;
    }
};

export const getQuestions = async (params = {}) => {
    try {
        const response = await api.get('/questions/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
};

export const getQuestion = async (id) => {
    try {
        const response = await api.get(`/questions/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching question:', error);
        throw error;
    }
};

export const updateQuestion = async (id, data) => {
    try {
        const response = await api.patch(`/questions/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating question:', error);
        throw error;
    }
};

export const deleteQuestion = async (id) => {
    try {
        await api.delete(`/questions/${id}/`);
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
};

export const getCourses = async () => {
    try {
        const response = await api.get('/courses/');
        return response.data;
    } catch (error) {
        console.error('Error fetching courses:', error);
        throw error;
    }
};

export const getTopics = async () => {
    try {
        const response = await api.get('/topics/');
        return response.data;
    } catch (error) {
        console.error('Error fetching topics:', error);
        throw error;
    }
};

export const getAnalytics = async (params = {}) => {
    try {
        const response = await api.get('/analytics/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics:', error);
        throw error;
    }
};

export const getUsers = async (params = {}) => {
    try {
        const response = await api.get('/users/management/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const updateUserRole = async (id, data) => {
    try {
        const response = await api.patch(`/users/management/${id}/`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
};

export default api;
