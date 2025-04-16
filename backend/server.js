import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

// 👉 Load env
dotenv.config()

// 👉 Import route
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = process.env.PORT || 5050

// ✅ CORS (frontend localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))

// ✅ Middleware
app.use(express.json())
app.use(cookieParser())

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected:', mongoose.connection.host))
.catch((err) => console.error('MongoDB connection error:', err.message))

// ✅ Routes
app.use('/api/auth', authRoutes)

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
