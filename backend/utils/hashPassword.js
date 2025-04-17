import bcrypt from 'bcrypt'

// ✅ Hash password sebelum simpan dalam database
export const hashPassword = async (plainPassword) => {
  const saltRounds = 10
  return await bcrypt.hash(plainPassword, saltRounds)
}

// ✅ Bandingkan input password dengan password dalam database
export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword)
}
