import axios from 'axios';

const postApi = axios.create({
    baseURL: process.env.REACT_APP_POST_SERVICE_URL,
});


export const createPost = async (title: string, content: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found. Please login first.');
    }

    const response = await postApi.post('/api/posts/create', {
        title,
        content,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
