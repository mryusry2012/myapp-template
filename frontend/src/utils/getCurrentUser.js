// src/utils/getCurrentUser.js
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error || !data.user) return null
  return data.user
}
