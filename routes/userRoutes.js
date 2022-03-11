import express from "express";
const router = express.Router();
import { register, auth, confirm, forgotPassword, checkToken, newPassword, profile } from '../controllers/userController.js';
import checkAuth from '../middleware/checkAuth.js';

// Auth, register
router.post('/', register);
router.post('/login', auth);
router.get('/confirm/:token', confirm);
router.post('/forgot-password', forgotPassword);
router.route('/forgot-password/:token').get(checkToken).post(newPassword);

router.get('/profile', checkAuth, profile);

export default router;