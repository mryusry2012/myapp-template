// components/dashboard/RecentActivity.jsx
import { ClockIcon } from "@heroicons/react/24/outline"

export default function RecentActivity({ activity = [] }) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>

      <div className="space-y-3">
        {activity.length > 0 ? (
          activity.map((entry, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white/60 p-3 rounded-lg border border-gray-200"
            >
              <ClockIcon className="h-5 w-5 text-blue-500 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {entry.name}{" "}
                  <span className="text-gray-500 text-xs">(Level {entry.level})</span>
                </p>
                <p className="text-xs text-gray-500">{entry.date}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/60 p-4 rounded-lg border border-gray-200 text-sm text-gray-500 italic">
            No recent activity yet.
          </div>
        )}
      </div>
    </div>
  )
}
