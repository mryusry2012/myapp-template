// frontend/src/pages/Register.jsx

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
  country_code: yup.string().required("Country code is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

function Register() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  // ✅ Ambil referral UID dari URL dan simpan dalam cookie
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const ref = urlParams.get("ref")
    if (ref) {
      setReferralUID(ref)
    }
  }, [])

  const onSubmit = async (data) => {
    const referred_by = getReferralUID() || null

    const response = await fetch("http://localhost:5050/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, referred_by }),
    })

    const result = await response.json()

    if (!response.ok) {
      alert(result.error || "Registration failed")
    } else {
      alert("Registration successful!")
      navigate("/login")
    }
  }

  return (
    <div className="text-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#D5E5D5] shadow-lg rounded-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">First Name</label>
              <input
                type="text"
                {...register("first_name")}
                className="w-full p-2 border rounded-md bg-white"
                placeholder="John"
              />
              {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm">Last Name</label>
              <input
                type="text"
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
            <label className="block mb-1 text-sm">Country Code</label>
            <select {...register("country_code")} className="w-full p-2 border rounded-md bg-white">
              <option value="">Select Country</option>
              <option value="+60">🇲🇾 Malaysia (+60)</option>
              <option value="+65">🇸🇬 Singapore (+65)</option>
              <option value="+66">🇹🇭 Thailand (+66)</option>
              <option value="+62">🇮🇩 Indonesia (+62)</option>
            </select>
            {errors.country_code && <p className="text-red-500 text-sm">{errors.country_code.message}</p>}
          </div>

          <div>
            <label className="block mb-1 text-sm">Phone Number</label>
            <input
              type="text"
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
            className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
