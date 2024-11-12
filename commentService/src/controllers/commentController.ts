import { Request, Response } from 'express';
import { createComment, getCommentsByPost } from '../models/commentModel';

export const createCommentController = async (req: Request, res: Response): Promise<void> => {
    const { postId, content } = req.body;
    const authorId = (req as any).user?.userId;

    if (!authorId) {
        res.status(400).json({ message: 'Author ID is missing' });
        return;
    }

    try {
        const newComment = await createComment(postId, content, authorId);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment' });
    }
};

export const getCommentsByPostController = async (req: Request, res: Response): Promise<void> => {
    const postId = parseInt(req.params.postId);

    try {
        const comments = await getCommentsByPost(postId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments' });
    }
};
