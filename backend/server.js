// backend/server.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'

// ✅ Load .env variables
dotenv.config()

const app = express()

// ✅ CORS Setup (Frontend localhost)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

// ✅ Body parser & cookies
app.use(express.json())
app.use(cookieParser())

// ✅ API Routes
app.use('/api/auth', authRoutes)

// ✅ Start the Server
const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running at http://localhost:${PORT}`)
})
