import { Router } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import { createPostController, getAllPostsController } from '../controllers/postController';

const router = Router();


router.post('/create', authenticateJWT, createPostController);


router.get('/', getAllPostsController);

export default router;
