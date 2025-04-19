// src/components/layout/Topbar.jsx
import React from "react"
import { Menu } from "lucide-react"

function Topbar({ onMenuClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b shadow-sm h-16 px-6 flex items-center justify-between md:ml-64">
      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-800 tracking-tight">
        Dashboard
      </h1>

      {/* Mobile Hamburger */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-gray-700 hover:text-black transition p-2"
        aria-label="Toggle sidebar menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  )
}

export default Topbar
