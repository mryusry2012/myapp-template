// src/utils/supabase.js
import { createClient } from "@supabase/supabase-js"

// ✅ Optional - still needed if you fetch from Supabase table directly (e.g., user profile)
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

// ✅ Get current user from localStorage (for custom backend login)
export function getCurrentUser() {
  const storedUser = localStorage.getItem("user")
  return storedUser ? JSON.parse(storedUser) : null
}
