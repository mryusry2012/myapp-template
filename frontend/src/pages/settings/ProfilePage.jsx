import { useEffect, useState } from "react"
import Layout from "@/components/layout/Layout"
import { getCurrentUser } from "@/utils/getCurrentUser"
import { supabase } from "@/utils/supabase"

function ProfilePage() {
  const [userData, setUserData] = useState(null)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [loading, setLoading] = useState(true)
  const [sessionMissing, setSessionMissing] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await getCurrentUser()
      if (!user) {
        console.warn("❌ No session found.")
        setSessionMissing(true)
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("users_clean_reset")
        .select("*")
        .eq("email", user.email)
        .single()

      if (error || !data) {
        console.warn("❌ User data not found.")
        setSessionMissing(true)
        setLoading(false)
        return
      }

      setUserData(data)
      setForm({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
      })

      setLoading(false)
    }

    fetchProfile()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setSessionMissing(true)
        setUserData(null)
      }
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from("users_clean_reset")
      .update({
        first_name: form.firstName,
        last_name: form.lastName,
        phone: form.phone,
      })
      .eq("email", form.email)

    if (error) {
      alert("❌ Failed to update profile.")
    } else {
      alert("✅ Profile updated successfully!")
    }
  }

  if (loading) {
    return (
      <Layout user={{ first_name: "", referral_uid: "" }}>
        <div className="text-center py-24 text-gray-500 text-sm">🔄 Loading profile...</div>
      </Layout>
    )
  }

  if (sessionMissing || !userData) {
    return (
      <Layout user={{ first_name: "", referral_uid: "" }}>
        <div className="text-center py-24 text-red-500">
          Session not found. Please{" "}
          <a href="/login" className="underline text-indigo-600">login again</a>.
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={userData}>
      <div className="max-w-5xl mx-auto px-4 md:px-10 py-8 space-y-8">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
        <p className="text-sm text-gray-500">Manage your personal info & account details.</p>

        {/* Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow">
          <img
            src="https://i.pravatar.cc/120"
            alt="avatar"
            className="w-28 h-28 rounded-full border-2 border-indigo-500 shadow"
          />
          <div className="text-center sm:text-left">
            <p className="text-lg font-medium text-gray-800">
              {form.firstName} {form.lastName}
            </p>
            <button className="mt-2 text-sm text-indigo-600 hover:underline">
              Change Avatar
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                readOnly
                className="w-full bg-gray-100 border border-gray-300 rounded-md px-3 py-2 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default ProfilePage
