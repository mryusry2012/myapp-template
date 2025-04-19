import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

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
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Login error:", error)
      alert("❌ " + error.message)
      return
    }

    if (data.session) {
      console.log("✅ Login success:", data)
      alert("✅ Login successful!")
      navigate("/dashboard")
    } else {
      alert("❌ Session not found after login.")
    }
  }

  // Auto redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session) {
        navigate("/dashboard")
      }
    }
    checkSession()
  }, [navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="w-[470px] bg-[#D5E5D5] shadow-lg rounded-xl p-8 flex flex-col justify-center space-y-6">
        <h1 className="text-2xl font-bold text-center">Login to Your Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="you@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
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
