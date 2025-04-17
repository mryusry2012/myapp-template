import { v4 as uuidv4 } from 'uuid'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { hashPassword } from '../utils/hashPassword.js'

dotenv.config()

// ✅ Connect Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// ✅ Register User API
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

    // ✅ Hash password
    const hashedPassword = await hashPassword(password)

    // ✅ Auto generate referral UID (format: MVM 235687 SY)
    const randomSixDigit = Math.floor(100000 + Math.random() * 900000)
    const referral_uid = `MVM ${randomSixDigit} SY`

    // ✅ Insert into Supabase
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
      console.error("Register error:", error)
      return res.status(400).json({ error: error.message })
    }

    return res.status(201).json({
      message: 'User registered successfully',
      referral_uid,
    })
  } catch (err) {
    console.error('Register error:', err.message)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
