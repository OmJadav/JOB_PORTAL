import express from 'express'
import { getUser, login, logout, register, updatePassword, updateUser } from '../controllers/userController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', authMiddleware, logout)
router.get('/profile', authMiddleware, getUser)
router.put('/update/profile', authMiddleware, updateUser)
router.put('/update/password', authMiddleware, updatePassword)

export default router;
