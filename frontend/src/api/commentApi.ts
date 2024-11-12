
import axios from 'axios';


const commentApi = axios.create({
    baseURL: process.env.REACT_APP_COMMENT_SERVICE_URL,
});


export const fetchComments = async (postId: string) => {
    const response = await commentApi.get(`/api/comments/${postId}`);
    return response.data;
};


export const createComment = async (postId: string, content: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found. Please login first.');
    }

    const response = await commentApi.post(
        '/api/comments/create',
        { postId, content },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
