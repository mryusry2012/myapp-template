// src/pages/UpgradePage.jsx
import { useNavigate } from "react-router-dom"
import { createClient } from "@supabase/supabase-js"
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

export default function UpgradePage() {
  const navigate = useNavigate()

  const currentUserUID = "MVM 923149 SY" // Nanti ganti dengan session/user context

  const handleUpgrade = async () => {
    const { error } = await supabase
      .from("users_clean_reset")
      .update({ is_paid: true })
      .eq("referral_uid", currentUserUID)

    if (error) {
      alert("Upgrade failed: " + error.message)
    } else {
      alert("✅ Upgrade successful! Welcome to the paid members team.")
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 space-y-5">
        <div className="flex items-center gap-3">
          <ArrowUpCircleIcon className="h-8 w-8 text-orange-600" />
          <h2 className="text-xl font-bold text-gray-800">Upgrade to Paid Member</h2>
        </div>

        <p className="text-gray-700 text-sm">
          Activate your account now for only <strong>RM100</strong> and unlock full commissions!
        </p>

        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
          <li>Unlock all commissions (Level 1–4)</li>
          <li>Keep all your downlines</li>
          <li>Auto-placement for team building</li>
        </ul>

        <button
          onClick={handleUpgrade}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-xl font-semibold tracking-wide transition-all duration-300 animate-bounce"
        >
          Upgrade Now – RM100
        </button>

        <p className="text-xs text-center text-gray-400">
          You can cancel anytime. No auto renewal.
        </p>
      </div>
    </div>
  )
}
