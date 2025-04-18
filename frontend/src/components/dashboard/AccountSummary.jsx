// src/components/dashboard/AccountSummary.jsx
import { IdentificationIcon, CalendarDaysIcon, EnvelopeIcon, ClockIcon } from "@heroicons/react/24/outline"

function AccountSummary({ user }) {
  return (
    <section className="mb-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Maklumat Akaun</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-white shadow-sm p-4 rounded-lg">
          <IdentificationIcon className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Referral UID</p>
            <p className="text-base font-medium text-gray-800">{user.referral_uid}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white shadow-sm p-4 rounded-lg">
          <CalendarDaysIcon className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Tarikh Daftar</p>
            <p className="text-base font-medium text-gray-800">{user.joined_at}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white shadow-sm p-4 rounded-lg">
          <ClockIcon className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="text-sm text-gray-500">Login Terakhir</p>
            <p className="text-base font-medium text-gray-800">{user.last_login}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white shadow-sm p-4 rounded-lg">
          <EnvelopeIcon className="w-5 h-5 text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-base font-medium text-gray-800">{user.email}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AccountSummary
