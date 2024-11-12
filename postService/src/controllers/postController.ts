import { Request, Response } from 'express';
import { createPost, getAllPosts } from '../models/postModel';


export const createPostController = async (req: Request, res: Response): Promise<void> => {
    const { title, content } = req.body;
    const author_id = (req as any).user?.userId;

    if (!author_id) {
        res.status(400).json({ message: 'Author ID is missing' });
        return;
    }

    try {
        const newPost = await createPost(title, content, author_id);
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating post' });
    }
};


export const getAllPostsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
};
