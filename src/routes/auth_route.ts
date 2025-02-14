import express from 'express';
import { auth_login } from '../controllers/auth_controllers';
import { auth_logout } from '../controllers/auth_controllers/auth_logout';

const router = express.Router();


router.post('/login', auth_login);
router.post('/logout', auth_logout);

export default router;