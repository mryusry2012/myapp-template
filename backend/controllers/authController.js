// backend/controllers/authController.js
import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv"
import { hashPassword, comparePassword } from "../utils/hashPassword.js"

dotenv.config()

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
)

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      dob,
      phone,
      email,
      password,
      referral_uid,
      referred_by,
    } = req.body

    if (!first_name || !last_name || !dob || !phone || !email || !password || !referral_uid) {
      return res.status(422).json({ error: "Missing required fields" })
    }

    // ✅ Check if email already exists
    const { data: existingUser } = await supabase
      .from("users_clean_reset")
      .select("id")
      .eq("email", email)
      .single()

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" })
    }

    const hashedPassword = await hashPassword(password)

    const { error } = await supabase.from("users_clean_reset").insert([
      {
        first_name,
        last_name,
        dob,
        phone,
        email,
        password: hashedPassword,
        referral_uid,
        referred_by: referred_by || null,
        komisen: 0,
        is_paid: false,
      },
    ])

    if (error) {
      console.error("❌ Supabase Insert Error:", error)
      return res.status(400).json({ error: error.message })
    }

    return res.status(201).json({
      message: "✅ User registered successfully",
      referral_uid,
    })
  } catch (err) {
    console.error("❌ Register Exception:", err.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(422).json({ error: "Email and password are required" })
    }

    const { data: user, error } = await supabase
      .from("users_clean_reset")
      .select("*")
      .eq("email", email)
      .single()

    if (error || !user) {
      console.error("❌ Supabase Lookup Error:", error)
      return res.status(401).json({ error: "Invalid email or account not found" })
    }

    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" })
    }

    return res.status(200).json({
      message: "✅ Login successful",
      user: {
        id: user.id,
        email: user.email,
        referral_uid: user.referral_uid,
      },
    })
  } catch (err) {
    console.error("❌ Login Exception:", err.message)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
