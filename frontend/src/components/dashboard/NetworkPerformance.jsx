// components/dashboard/NetworkPerformance.jsx
import { UserIcon } from "@heroicons/react/24/solid"

export default function NetworkPerformance({ levels = {}, levelsDetail = {} }) {
  const displayLevels = [1, 2, 3, 4]

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">Network Performance (Level 1–4)</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {displayLevels.map((level) => (
          <div
            key={level}
            className="bg-yellow-50 rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-yellow-600" />
                <p className="font-semibold text-gray-700">Level {level}</p>
              </div>
              <span className="text-sm text-gray-500">
                {levels[level] || 0} user(s)
              </span>
            </div>

            <div className="space-y-1">
              {levelsDetail[level]?.length > 0 ? (
                levelsDetail[level].map((user) => (
                  <div
                    key={user.id}
                    className="text-sm text-gray-700 bg-white/60 px-3 py-1 rounded-md border border-gray-200"
                  >
                    {user.first_name} {user.last_name} • {user.referral_uid}
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No users at this level.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
