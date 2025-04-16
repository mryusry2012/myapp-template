import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js' // ← import route di bawah dulu

dotenv.config()
connectDB()

const app = express() // ← inisialisasi MESTI sebelum app.use

app.use(express.json())
app.use(cookieParser())

// 🔗 Route
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('✅ API is running...')
})

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`)
})
