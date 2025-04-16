import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import generateReferralUID from '../utils/generateUID.js'
import jwt from 'jsonwebtoken'

// Register

export const registerUser = async (req, res) => {
    const {
      firstName,
      lastName,
      dob,
      gender,
      countryCode,
      phone,
      email,
      password,
      referredBy
    } = req.body
  
    try {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' })
      }
  
      const hashedPassword = await bcrypt.hash(password, 10)
  
      let referralUID
      let isUnique = false
  
      while (!isUnique) {
        referralUID = generateReferralUID()
        const uidExists = await User.findOne({ referralUID })
        if (!uidExists) isUnique = true
      }
  
      const newUser = new User({
        firstName,
        lastName,
        dob,
        gender,
        countryCode,
        phone,
        email,
        password: hashedPassword,
        referralUID,
        referredBy: referredBy || null,
      })
  
      await newUser.save()
  
      res.status(201).json({
        message: 'User registered successfully',
        referralUID: referralUID,
      })
    } catch (error) {
      console.error('Register error:', error.message)
      res.status(500).json({ message: 'Server error' })
    }
  }

// login

export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Email not registered' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res
      .cookie('token', token, {
        httpOnly: true,
        secure: false, // Tukar ke true jika HTTPS
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 hari
      })
      .json({
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          referralUID: user.referralUID,
        }
      })
  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ message: 'Server error' })
  }
}

