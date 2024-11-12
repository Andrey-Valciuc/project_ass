import { Router } from 'express';
import { searchPostsController } from '../controllers/searchController';

const router = Router();


router.get('/', searchPostsController);

export default router;
