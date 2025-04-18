// src/components/layout/Sidebar.jsx
import React from "react"
import { NavLink } from "react-router-dom"
import { Home, User, BarChart2, LogOut } from "lucide-react"

function Sidebar({ isOpen, onClose }) {
  const handleCloseMobile = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose()
    }
  }

  // Sementara untuk demo – boleh tukar kepada props.user.referral_uid jika dynamic
  const memberID = "MVM 923149 SY"

  return (
    <>
      {/* Backdrop - mobile only */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1F2937] text-white z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative md:flex md:flex-col md:h-screen`}
      >
        <div className="flex flex-col justify-between h-full p-6">
          {/* Avatar + Info */}
          <div>
            <div className="flex flex-col items-center gap-2 mb-6">
              <img
                src="https://i.pravatar.cc/100"
                alt="avatar"
                className="w-16 h-16 rounded-full border-2 border-white"
              />
              <p className="text-lg font-semibold">Yusri</p>
              <p className="text-sm text-gray-400">Member</p>
              <p className="text-xs text-gray-300">ID: {memberID}</p>
            </div>

            <hr className="border-white/20 mb-6" />

            <nav className="space-y-3">
              <NavLink
                to="/dashboard"
                onClick={handleCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-all ${
                    isActive ? "bg-white/10 font-semibold" : ""
                  }`
                }
              >
                <Home className="w-5 h-5" />
                Overview
              </NavLink>

              <NavLink
                to="/update-profile"
                onClick={handleCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-all ${
                    isActive ? "bg-white/10 font-semibold" : ""
                  }`
                }
              >
                <User className="w-5 h-5" />
                Profile
              </NavLink>

              <NavLink
                to="/charts"
                onClick={handleCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-all ${
                    isActive ? "bg-white/10 font-semibold" : ""
                  }`
                }
              >
                <BarChart2 className="w-5 h-5" />
                Charts
              </NavLink>
            </nav>
          </div>

          {/* Logout */}
          <div>
            <button
              onClick={() => (window.location.href = "/login")}
              className="flex items-center gap-2 text-red-400 hover:text-red-500 px-4 py-2 transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
