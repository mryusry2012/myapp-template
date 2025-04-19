// src/App.jsx
import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { supabase } from "@/utils/supabase"

// Pages
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import UpdatePassword from "./pages/UpdatePassword"
import UpgradePage from "./pages/UpgradePage"
import ChartsPage from "./pages/ChartsPage"
import ProfilePage from "./pages/settings/ProfilePage"

function AppRoutes() {
  const navigate = useNavigate()
  const location = useLocation()

  // ✅ Manual session check on every route change
  useEffect(() => {
    const checkSession = async () => {
      const publicPages = ["/login", "/register", "/forgot-password", "/reset-password"]
      const isPublic = publicPages.includes(location.pathname)

      const session = localStorage.getItem("user")

      if (!session && !isPublic) {
        navigate("/login")
      }
    }

    checkSession()
  }, [location.pathname, navigate])

  return (
    <Routes>
      {/* 🔓 Public */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* 🔐 Protected */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="/upgrade" element={<UpgradePage />} />
      <Route path="/charts" element={<ChartsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        pauseOnHover
        theme="light"
      />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
