import React from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import api from "@/services/api"
import { getReferralUID } from "@/utils/cookies"

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dob: yup.string().required("Date of birth is required"),
  countryCode: yup.string().required("Country code is required"),
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
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      const referralUID = getReferralUID()

      await api.post("/auth/register", {
        ...data,
        referredBy: referralUID || null,
      })

      alert("Registration successful!")
      navigate("/login")
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-lg p-8 space-y-6 fade-in">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">First Name</label>
              <input
                type="text"
                {...register("firstName")}
                className="w-full p-2 border rounded-md bg-white"
                placeholder="John"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm">Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                className="w-full p-2 border rounded-md bg-white"
                placeholder="Doe"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm">Country Code</label>
              <select {...register("countryCode")} className="w-full p-2 border rounded-md bg-white">
                <option value="">Select</option>
                <option value="+60">🇲🇾 +60</option>
                <option value="+65">🇸🇬 +65</option>
                <option value="+62">🇮🇩 +62</option>
                <option value="+66">🇹🇭 +66</option>
              </select>
              {errors.countryCode && <p className="text-red-500 text-sm">{errors.countryCode.message}</p>}
            </div>
            <div>
              <label className="block mb-1 text-sm">Phone</label>
              <input
                type="text"
                {...register("phone")}
                className="w-full p-2 border rounded-md bg-white"
                placeholder="123456789"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>
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
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
