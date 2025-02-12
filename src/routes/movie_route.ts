import express from 'express';
import upload from '../utils/multerConfig';
import { movie_create, movie_get, movie_get_by_title } from '../controllers/movie_controllers';

const router = express.Router();


router.get('/', movie_get);
router.get('/by_title/:title', movie_get_by_title);
router.post('/create', upload.single('image'), movie_create);


export default router;