import axios from 'axios';


const SEARCH_SERVICE_URL = process.env.REACT_APP_SEARCH_SERVICE_URL || 'http://localhost:5003';


export const searchPosts = async (query: string) => {
    try {
        const response = await axios.get(`${SEARCH_SERVICE_URL}/api/search`, {
            params: { query },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching posts:', error);
        throw error;
    }
};
