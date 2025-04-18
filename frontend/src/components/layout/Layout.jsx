// src/components/layout/Layout.jsx
import React, { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"

function Layout({ children, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [height, setHeight] = useState("auto")

  // Menetapkan ketinggian kontainer secara dinamik
  useEffect(() => {
    const handleResize = () => {
      const screenHeight = window.innerHeight
      setHeight(screenHeight) // Menetapkan ketinggian kontainer utama
    }

    window.addEventListener("resize", handleResize)

    handleResize() // Set height pertama kali

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="flex" style={{ minHeight: `${height}px` }}>
      {/* Sidebar (fixed left for mobile & desktop) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar
          user={user}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content Area */}
        <main className="flex-1 pt-28 px-6 md:px-10 lg:px-20 max-w-screen-xl mx-auto w-full space-y-12 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
