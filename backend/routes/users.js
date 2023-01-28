import express from 'express';
import { registerUser, loginUser, getUser, getUsers } from '../controllers/users.js'
import protect from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)
router.get('/users', getUsers)


export default router