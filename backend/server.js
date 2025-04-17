import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'

// ✅ Load env
dotenv.config()

const app = express()

// ✅ Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

// ✅ Routes
app.use('/api/auth', authRoutes)

// ✅ Server Start
const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
