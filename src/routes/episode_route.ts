import express from 'express';
import { episode_create, episode_get } from '../controllers/episode_controllers';

const router = express.Router();


router.get('/:title/:episode_number', episode_get);
router.post('/create', episode_create);

export default router;