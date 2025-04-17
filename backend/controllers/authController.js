import { v4 as uuidv4 } from 'uuid'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { hashPassword, comparePassword } from '../utils/hashPassword.js'

dotenv.config()

// ✅ Sambungan Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// ✅ Fungsi daftar pengguna
export const registerUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      dob,
      country_code,
      phone,
      email,
      password,
      referred_by,
    } = req.body

    const hashedPassword = await hashPassword(password)
    const randomSixDigit = Math.floor(100000 + Math.random() * 900000)
    const referral_uid = `MVM ${randomSixDigit} SY`

    const { error } = await supabase.from('users_clean_reset').insert([
      {
        first_name,
        last_name,
        dob,
        country_code,
        phone,
        email,
        password: hashedPassword,
        referral_uid,
        referred_by: referred_by || null,
      },
    ])

    if (error) {
      console.error('❌ Register error:', error)
      return res.status(400).json({ error: error.message })
    }

    return res.status(201).json({
      message: 'User registered successfully',
      referral_uid,
    })
  } catch (err) {
    console.error('❌ Register exception:', err.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

// ✅ Fungsi login pengguna
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const { data: user, error } = await supabase
      .from('users_clean_reset')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !user) {
      console.error('❌ Login error:', error)
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        referral_uid: user.referral_uid,
      },
    })
  } catch (err) {
    console.error('❌ Login exception:', err.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
