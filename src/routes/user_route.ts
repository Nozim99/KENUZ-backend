import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { user_create, user_get_all } from '../controllers/user_controllers';

const router = express.Router();


router.get('/get-all', authMiddleware, user_get_all);
router.post('', authMiddleware, user_create);

export default router;