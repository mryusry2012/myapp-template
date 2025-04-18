// components/dashboard/ReferralOverview.jsx
import { ShieldCheckIcon, UserGroupIcon, BanknotesIcon } from "@heroicons/react/24/solid"

export default function ReferralOverview({ data }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">Referral Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Komisen */}
        <div className="bg-green-50 rounded-xl p-4 shadow hover:shadow-md transition">
          <div className="flex items-center space-x-3">
            <BanknotesIcon className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Total Commission</p>
              <p className="text-lg font-bold text-gray-800">RM {data.komisen || 0}</p>
            </div>
          </div>
        </div>

        {/* Downline */}
        <div className="bg-blue-50 rounded-xl p-4 shadow hover:shadow-md transition">
          <div className="flex items-center space-x-3">
            <UserGroupIcon className="h-6 w-6 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Total Downlines</p>
              <p className="text-lg font-bold text-gray-800">{data.downline_total} user(s)</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-gray-50 rounded-xl p-4 shadow hover:shadow-md transition">
          <div className="flex items-center space-x-3">
            <ShieldCheckIcon className="h-6 w-6 text-gray-600" />
            <div>
              <p className="text-sm text-gray-500">Membership Status</p>
              <p className="text-lg font-bold text-gray-800">
                {data.is_paid ? "Paid Member" : "Free Member"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
