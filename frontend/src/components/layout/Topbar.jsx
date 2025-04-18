// src/components/layout/Topbar.jsx
import React from "react"
import { Menu } from "lucide-react"

function Topbar({ onMenuClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white shadow-sm h-16 px-6 flex items-center justify-between border-b md:ml-64">
      {/* Page Title */}
      <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>

      {/* Hamburger for Mobile */}
      <button
        onClick={onMenuClick}
        className="md:hidden text-gray-700 hover:text-black p-2"
        title="Toggle Menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  )
}

export default Topbar
