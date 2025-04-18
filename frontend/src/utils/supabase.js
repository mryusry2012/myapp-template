// src/utils/supabase.js
import { createClient } from "@supabase/supabase-js"

// ✅ Inisialisasi Supabase client
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

// ✅ Helper universal untuk dapatkan user login
export async function getCurrentUser(retry = 3) {
  for (let i = 0; i < retry; i++) {
    const { data, error } = await supabase.auth.getSession()

    if (data?.session?.user) {
      return data.session.user
    }

    // ⏳ Tunggu 200ms sebelum cuba lagi (untuk elak race condition)
    await new Promise((resolve) => setTimeout(resolve, 200))
  }

  // ❌ Jika gagal selepas retry, return null
  return null
}
