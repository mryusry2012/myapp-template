import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    dob: { type: Date, required: true },
    gender: {
      type: String,
      enum: ['Male', 'Female'], // ✅ Ini WAJIB
      required: true,
    },
    countryCode: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    referralUID: { type: String, required: true, unique: true, trim: true },
    referredBy: { type: String, default: null, trim: true },
  },
  { timestamps: true }
)

// 🔥 PENTING: padam model lama sebelum buat baru
if (mongoose.models.User) {
  delete mongoose.models.User
}

const User = mongoose.model('User', userSchema, 'users')

export default User
