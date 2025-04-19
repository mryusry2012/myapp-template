import React, { useEffect, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Home, User, BarChart2, LogOut } from "lucide-react"

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const memberID = "MVM 923149 SY"
  const audioRef = useRef(null)

  // 🟡 Setup pop sound
  useEffect(() => {
    audioRef.current = new Audio("/sound/pop-94319.mp3")
    audioRef.current.volume = 0.4
    audioRef.current.load()
  }, [])

  const handleHover = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((err) => {
        console.warn("🔇 Sound autoplay blocked:", err.message)
      })
    }
  }

  // 🟢 Logout and clear session
  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  // 📱 Auto close menu on mobile after click
  const handleCloseMobile = () => {
    if (window.innerWidth < 768 && onClose) {
      onClose()
    }
  }

  return (
    <>
      {/* Backdrop for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#1F2937] text-white z-40 transform transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:relative md:flex md:flex-col md:h-screen shadow-xl`}
      >
        <div className="flex flex-col justify-between h-full p-6">
          {/* User Info */}
          <div>
            <div className="flex flex-col items-center gap-2 mb-6">
              <img
                src="https://i.pravatar.cc/100"
                alt="avatar"
                className="w-16 h-16 rounded-full border-2 border-white hover:opacity-80 transition"
              />
              <p className="text-lg font-semibold">Yusri</p>
              <p className="text-sm text-gray-400">Member</p>
              <p className="text-xs text-gray-300">ID: {memberID}</p>
            </div>

            <hr className="border-white/20 mb-6" />

            {/* Navigation Links */}
            <nav className="space-y-3">
              {[
                { to: "/dashboard", icon: Home, label: "Overview" },
                { to: "/profile", icon: User, label: "Profile" },
                { to: "/charts", icon: BarChart2, label: "Charts" },
              ].map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={handleCloseMobile}
                  onMouseEnter={handleHover}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-lg transition-all hover:bg-white/10 hover:scale-105 hover:shadow
                    ${
                      isActive
                        ? "bg-white/10 font-semibold shadow-inner border border-white/20"
                        : ""
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-500 px-4 py-2 transition hover:scale-105"
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
