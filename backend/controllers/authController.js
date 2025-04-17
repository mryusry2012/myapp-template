import bcrypt from 'bcryptjs'
import supabase from '../lib/supabaseClient.js'
import generateReferralUID from '../utils/generateUID.js'

// ✅ REGISTER USER
export const registerUser = async (req, res) => {
  const {
    firstName,
    lastName,
    dob,
    countryCode,
    phone,
    email,
    password,
    referredBy
  } = req.body

  try {
    // ✅ Check if email already exists
    const { data: existingUser, error: existingError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // ✅ Generate unique referral UID
    let referralUID
    let isUnique = false

    while (!isUnique) {
      referralUID = generateReferralUID()
      const { data: uidExists } = await supabase
        .from('users')
        .select('id')
        .eq('referral_uid', referralUID)
        .single()
      if (!uidExists) isUnique = true
    }

    // ✅ Insert into Supabase table
    const { data, error } = await supabase.from('users').insert([
      {
        first_name: firstName,
        last_name: lastName,
        dob,
        country_code: countryCode,
        phone,
        email,
        password: hashedPassword,
        referral_uid: referralUID,
        referred_by: referredBy || null,
      },
    ])

    if (error) throw error

    // ✅ Success
    res.status(201).json({
      message: 'User registered successfully',
      referralUID,
    })
  } catch (err) {
    console.error('Register error:', err.message)
    res.status(500).json({ message: err.message || 'Server error' })
  }
}
