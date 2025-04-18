// src/components/layout/Footer.jsx
import React from "react"

function Footer() {
  return (
    <footer className="mt-auto w-full bg-white border-t text-gray-500 text-sm text-center py-4 shadow-sm">
      © {new Date().getFullYear()} Taplah Network. All rights reserved.
    </footer>
  )
}

export default Footer
