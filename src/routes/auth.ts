import { Router } from 'express'
import { register, getMe, login } from '../controllers/auth'
import { checkAuth } from '../middlewares/checkAuth'

const router = Router()

// Register
router.post('/register', register)

// Login
router.post('/login', login)

// Get Me
router.get('/me', checkAuth, getMe)

export default router
