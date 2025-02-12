import express from 'express';
import { sitemap_get } from '../controllers/sitemap_controllers';

const router = express.Router();


router.get('/', sitemap_get);


export default router;