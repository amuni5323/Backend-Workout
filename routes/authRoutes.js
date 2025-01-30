import express from 'express';
import { signupUser, loginUser, getUserWeight } from '../controllers/authController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/user-weight', requireAuth, getUserWeight); // Add this route

export default router;
