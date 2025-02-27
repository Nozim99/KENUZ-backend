import express from 'express';
import upload from '../utils/multerConfig';
import { movie_create, movie_edit_video_url, movie_get, movie_get_by_title } from '../controllers/movie_controllers';
import { authMiddleware } from '../middlewares/authMiddleware';
import { movie_search } from '../controllers/movie_controllers/movie_search';

const router = express.Router();


router.get('/', movie_get);
router.get('/by_title/:title', movie_get_by_title);
router.get('/search', movie_search);
router.post('/create', authMiddleware, upload.single('image'), movie_create);
router.put('/edit/video', authMiddleware, movie_edit_video_url);


export default router;