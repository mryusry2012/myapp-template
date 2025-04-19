// src/utils/getCurrentUser.js
import { supabase } from "./supabase"

export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      console.warn("❌ Supabase session missing or invalid")
      return null
    }
    return data.user
  } catch (err) {
    console.error("❌ getCurrentUser error:", err.message)
    return null
  }
}
