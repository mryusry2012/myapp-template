// src/settings/ProfilePage.jsx
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { useNavigate } from "react-router-dom"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

export default function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  })

  const currentUID = "MVM 923149 SY" // akan diganti session

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("users_clean_reset")
        .select("*")
        .eq("referral_uid", currentUID)
        .single()

      setUser(data)
      setForm({
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        email: data?.email || "",
        password: "",
      })
    }

    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()

    const updateData = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
    }

    if (form.password) {
      updateData.password = form.password
    }

    const { error } = await supabase
      .from("users_clean_reset")
      .update(updateData)
      .eq("referral_uid", currentUID)

    if (error) {
      alert("Failed to update profile")
    } else {
      alert("Profile updated successfully!")
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4 py-8">
      <form
        onSubmit={handleUpdate}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-xl space-y-4"
      >
        <h2 className="text-xl font-bold text-gray-800">Update Profile</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-2 border rounded-md w-full"
          />
        </div>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border rounded-md w-full"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          className="p-2 border rounded-md w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}
