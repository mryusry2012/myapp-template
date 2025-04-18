// src/App.jsx
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import UpdatePassword from "./pages/UpdatePassword"
import UpgradePage from "./pages/UpgradePage"
import ChartsPage from "./pages/ChartsPage"
import ProfilePage from "./pages/settings/ProfilePage" // ✅ ini yang digunakan

function App() {
  return (
    <BrowserRouter>
      {/* Global Toast Notification */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* 🔓 Public Auth Pages */}
        <Route
          path="/register"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
              <Register />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
              <Login />
            </div>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
              <ForgotPassword />
            </div>
          }
        />
        <Route
          path="/reset-password"
          element={
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
              <ResetPassword />
            </div>
          }
        />

        {/* 🔐 Dashboard + Protected Pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/upgrade" element={<UpgradePage />} />
        <Route path="/charts" element={<ChartsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
