// components/dashboard/ReferralOverview.jsx
import {
    ShieldCheckIcon,
    UserGroupIcon,
    BanknotesIcon,
  } from "@heroicons/react/24/solid"
  
  export default function ReferralOverview({ data }) {
    const cards = [
      {
        label: "Total Commission",
        value: `RM ${data.komisen?.toFixed(2) || "0.00"}`,
        icon: <BanknotesIcon className="h-6 w-6 text-white" />,
        bg: "bg-gradient-to-r from-emerald-500 to-green-500",
      },
      {
        label: "Total Downlines",
        value: `${data.downline_total || 0} user(s)`,
        icon: <UserGroupIcon className="h-6 w-6 text-white" />,
        bg: "bg-gradient-to-r from-sky-500 to-blue-500",
      },
      {
        label: "Membership Status",
        value: data.is_paid ? "Paid Member" : "Free Member",
        icon: <ShieldCheckIcon className="h-6 w-6 text-white" />,
        bg: data.is_paid
          ? "bg-gradient-to-r from-yellow-500 to-amber-500"
          : "bg-gradient-to-r from-gray-400 to-gray-600",
      },
    ]
  
    return (
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Referral Overview
        </h2>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 font-[Inter,sans-serif]">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`rounded-xl ${card.bg} p-6 min-h-[140px] shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg">
                  {card.icon}
                </div>
                <div className="text-white">
                  <p className="text-sm opacity-90">{card.label}</p>
                  <p className="text-2xl font-semibold">{card.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  