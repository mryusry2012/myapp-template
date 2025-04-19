// src/pages/Register.jsx
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { getReferralUID, setReferralUID } from "@/utils/cookies"

const schema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  dob: yup.string().required("Date of birth is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
})

function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  // ✅ Ambil referral UID dari URL (jika ada) dan simpan dalam cookie
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const ref = urlParams.get("ref")
    if (ref) setReferralUID(ref)
  }, [])

  const onSubmit = async (form) => {
    const referred_by = getReferralUID() || null
    const referral_uid = `MVM ${Math.floor(100000 + Math.random() * 900000)} SY`

    try {
      const response = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          phone: `+60${form.phone}`, // ✅ Auto Malaysia
          referral_uid,
          referred_by,
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        alert(result.error || "❌ Registration failed")
        return
      }

      alert("✅ Registration successful!")
      navigate("/login")
    } catch (err) {
      console.error("❌ Register error:", err)
      alert("Something went wrong.")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-gray-800">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">First Name</label>
              <input
                {...register("first_name")}
                className="w-full p-2 border rounded-md bg-white"
                placeholder="John"
              />
              {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm">Last Name</label>
              <input
                {...register("last_name")}
                className="w-full p-2 border rounded-md bg-white"
                placeholder="Doe"
              />
              {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className="w-full p-2 border rounded-md bg-white"
            />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm">Phone Number</label>
            <input
              {...register("phone")}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="123456789"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="you@email.com"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 border rounded-md bg-white"
              placeholder="******"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
