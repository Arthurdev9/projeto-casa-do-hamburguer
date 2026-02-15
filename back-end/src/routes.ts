import { Router } from 'express'
import { auth, login, logout, register } from './controller/userController.js'
import { authMiddleware } from './middlewares/auth.js'
import {
  createProduct,
  deleteProduct,
  getProducts
} from './controller/productController.js'
import {
  createOrder,
  getOrders,
  updateOrderStatus
} from './controller/orderController.js'

export const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/me', authMiddleware, auth)
router.post('/logout', authMiddleware, logout)

router.get('/products', getProducts)
router.post('/products', authMiddleware, createProduct)
router.delete('/products/:id', authMiddleware, deleteProduct)
router.post('/orders', authMiddleware, createOrder)
router.get('/orders', authMiddleware, getOrders)
router.patch('/orders/:id', authMiddleware, updateOrderStatus)
