import { Request, Response } from 'express';
import { searchPosts } from '../models/searchModel';

export const searchPostsController = async (req: Request, res: Response): Promise<void> => {
    const { query } = req.query;

    if (!query || typeof query !== 'string') {
        res.status(400).json({ message: 'Query parameter is missing or invalid' });
        return;
    }

    try {
        const results = await searchPosts(query);
        if (results.length === 0) {
            res.status(200).json({ message: 'No posts found' });
        } else {
            res.status(200).json(results);
        }
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
