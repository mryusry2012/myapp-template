import express from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'

const router = express.Router()

// ✅ Route untuk pendaftaran
router.post('/register', registerUser)

// ✅ Route untuk login
router.post('/login', loginUser)

export default router
