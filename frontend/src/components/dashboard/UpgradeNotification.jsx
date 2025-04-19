// src/components/dashboard/UpgradeNotification.jsx
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid"

export default function UpgradeNotification({ user, downline }) {
  const firstName = user?.first_name || "User"
  const komisenTerlepas = 85 // RM40 + RM25 + RM10 + RM10
  const downlineCount = downline?.length || 0

  if (user?.is_paid) return null

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-orange-200 p-6 md:p-8 rounded-2xl shadow-xl space-y-5 text-gray-800">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ArrowUpCircleIcon className="h-8 w-8 text-orange-600 animate-pulse" />
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-800">
          ⚠️ {firstName}, your account is still FREE!
        </h2>
      </div>

      {/* Impact Details */}
      <div className="text-sm md:text-base space-y-2">
        <p className="text-gray-700">
          You already have{" "}
          <span className="font-bold text-orange-800">{downlineCount}</span> downlines (Level 1–4).
        </p>
        <p className="text-gray-700">
          You are missing out on{" "}
          <span className="font-bold text-red-600">RM{komisenTerlepas.toFixed(2)}</span> in commissions!
        </p>
        <p className="text-gray-700">
          Your referrals will be placed under other upgraded members.
        </p>
      </div>

      {/* Urgency */}
      <p className="text-sm text-red-700 italic">
        Don’t lose your team and effort. Upgrade now to start earning.
      </p>

      {/* CTA Button */}
      <div className="flex justify-end">
        <a
          href="/upgrade"
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-xl text-sm md:text-base font-semibold shadow-md transition transform hover:scale-105 animate-bounce"
        >
          Upgrade Now – RM100
        </a>
      </div>
    </div>
  )
}
