import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/services/api"
import { getReferralUID } from "@/utils/cookies"

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const referralUID = getReferralUID()

      await api.post("/auth/register", {
        ...form,
        referredBy: referralUID || null,
      })

      alert("Registration successful!")
      navigate("/login")
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8 space-y-6 fade-in">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              value={form.firstName}
              placeholder="First Name"
              className="w-full p-2 border rounded-md bg-input"
            />
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              value={form.lastName}
              placeholder="Last Name"
              className="w-full p-2 border rounded-md bg-input"
            />
          </div>

          <input
            type="date"
            name="dob"
            onChange={handleChange}
            value={form.dob}
            className="w-full p-2 border rounded-md bg-input"
          />

          <select
            name="gender"
            onChange={handleChange}
            value={form.gender}
            className="w-full p-2 border rounded-md bg-input"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="tel"
            name="phone"
            onChange={handleChange}
            value={form.phone}
            placeholder="Phone Number"
            className="w-full p-2 border rounded-md bg-input"
          />

          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            placeholder="Email"
            className="w-full p-2 border rounded-md bg-input"
          />

          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Password"
            className="w-full p-2 border rounded-md bg-input"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
