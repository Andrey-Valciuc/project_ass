import { Router } from 'express';
import { authenticateJWT } from '../middleware/commentMiddleware';
import { createCommentController, getCommentsByPostController } from '../controllers/commentController';

const router = Router();


router.post('/create', authenticateJWT, createCommentController);


router.get('/:postId', getCommentsByPostController);

export default router;
