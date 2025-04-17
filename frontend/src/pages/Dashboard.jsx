import React, { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

function Dashboard() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Dapatkan email dari Supabase Auth (jika guna supabase.auth)
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user?.email) {
        // Fetch user info dari Supabase table
        const { data, error } = await supabase
          .from("users_clean_reset")
          .select("*")
          .eq("email", user.email)
          .single()

        if (error) {
          console.error("Error fetching user:", error.message)
        } else {
          setUser(data)
        }
      }
    }

    getUser()
  }, [])

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.first_name || "User"}!</h2>
      <p className="mb-2">
        <strong>Member ID:</strong>{" "}
        <span className="text-blue-600 font-semibold">
          {user?.referral_uid || "-"}
        </span>
      </p>
      <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
      <p className="mb-2"><strong>Phone:</strong> {user?.country_code}{user?.phone}</p>
      <p className="mb-2"><strong>Referred By:</strong> {user?.referred_by || "None"}</p>
    </div>
  )
}

export default Dashboard
