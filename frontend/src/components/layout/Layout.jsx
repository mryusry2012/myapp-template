// src/components/layout/Layout.jsx
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

function Layout({ children, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()

  // ✅ Auto logout globally if no session
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (!storedUser) {
      navigate("/login")
    }
  }, [navigate])

  return (
    <div className="flex flex-col min-h-screen md:flex-row md:h-screen overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Topbar user={user} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className="flex-1 px-4 md:px-10 pt-20 pb-12 w-full">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
