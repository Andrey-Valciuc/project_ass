import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_AUTH_SERVICE_URL,
});


export const registerUser = async (email: string, password: string) => {
    const response = await api.post('/auth/register', { email, password });
    return response.data;
};


export const loginUser = async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;

    localStorage.setItem('token', token);

    return response.data;
};
