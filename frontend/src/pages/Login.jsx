// src/pages/Login.jsx
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
})

function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = async ({ email, password }) => {
    try {
      const response = await fetch("http://localhost:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        alert(result.error || "❌ Login failed")
        return
      }

      // ✅ Simpan user ke localStorage
      localStorage.setItem("user", JSON.stringify(result.user))

      alert("✅ Login successful!")
      navigate("/dashboard")
    } catch (error) {
      console.error("❌ Login error:", error)
      alert("❌ Something went wrong")
    }
  }

  // ✅ Auto redirect kalau dah login
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      navigate("/dashboard")
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center  to-white text-gray-800 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Login to Your Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="you@email.com"
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="••••••••"
              className="w-full p-2 border border-gray-300 rounded-md bg-white"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
