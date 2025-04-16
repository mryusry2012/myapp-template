import React from 'react'
import { useState } from 'react'
import api from '../services/api'
import { getReferralUID } from '../utils/cookies' // pastikan huruf kecil "cookies"

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const referralUID = getReferralUID() // ✅ ambil terus dari cookie

      const res = await api.post('/auth/register', {
        ...form,
        referredBy: referralUID || null
      })

      alert(`Register success! UID anda: ${res.data.referralUID}`)
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      <input name="name" onChange={handleChange} placeholder="Name" className="w-full border p-2" />
      <input name="email" onChange={handleChange} placeholder="Email" className="w-full border p-2" />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full border p-2" />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
    </form>
  )
}

export default Register
