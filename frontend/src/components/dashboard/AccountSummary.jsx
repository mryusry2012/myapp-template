// src/components/dashboard/AccountSummary.jsx
import { IdentificationIcon, EnvelopeIcon } from "@heroicons/react/24/outline"

function AccountSummary({ user }) {
  const avatarUrl = `https://i.pravatar.cc/150?u=${user.email}`

  return (
    <section className="mb-10">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white p-6 rounded-2xl shadow-xl">
        {/* Avatar */}
        <img
          src={avatarUrl}
          alt="User avatar"
          className="w-28 h-28 rounded-full border-2 border-indigo-500 shadow-lg"
        />

        {/* User Info */}
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-bold text-gray-800">
              {user.first_name} {user.last_name}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <IdentificationIcon className="w-5 h-5 text-indigo-500" />
            <span>Member ID: <strong>{user.referral_uid}</strong></span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <EnvelopeIcon className="w-5 h-5 text-red-500" />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountSummary
