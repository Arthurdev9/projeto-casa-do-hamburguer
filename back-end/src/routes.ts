import { Router } from 'express'
import { auth, login, logout, register } from './controller/userController.js'
import { authMiddleware } from './middlewares/auth.js'

export const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/me', authMiddleware, auth)
router.post('/logout', authMiddleware, logout)
