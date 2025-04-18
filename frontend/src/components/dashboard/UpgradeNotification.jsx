// src/components/dashboard/UpgradeNotification.jsx
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid"

export default function UpgradeNotification({ user, downline }) {
  const firstName = user?.first_name || "User"
  const komisenTerlepas = 40 + 25 + 10 + 10 // contoh tetap RM85
  const downlineCount = downline?.length || 0

  if (user?.is_paid) return null // sudah upgrade, tak perlu paparkan

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-orange-200 p-6 rounded-xl shadow-lg text-gray-800 space-y-3 animate-fade-in">
      <div className="flex items-center gap-3">
        <ArrowUpCircleIcon className="h-8 w-8 text-orange-600 animate-bounce" />
        <h2 className="text-xl font-bold">⚠️ {firstName}, your account is still FREE!</h2>
      </div>

      <ul className="text-sm list-disc list-inside text-gray-700 pl-2">
        <li>You already have <strong>{downlineCount}</strong> downlines (Level 1–4)</li>
        <li>Total commission you are missing: <strong>RM{komisenTerlepas.toFixed(2)}</strong></li>
        <li>Your downlines will auto-skip to upgraded upline.</li>
      </ul>

      <p className="text-sm italic text-red-600">
        Don’t let your hard work go to waste.
      </p>

      <div className="flex justify-end">
        <a
          href="/upgrade"
          className="bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg animate-bounce hover:bg-orange-700 transition"
        >
          Upgrade Now
        </a>
      </div>
    </div>
  )
}
