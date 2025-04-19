import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

export async function getCurrentUser(retry = 3, delay = 200) {
  for (let i = 0; i < retry; i++) {
    const { data } = await supabase.auth.getSession()
    if (data?.session?.user) {
      return data.session.user
    }
    await new Promise((res) => setTimeout(res, delay))
  }
  return null
}
