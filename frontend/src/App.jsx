// src/App.jsx
import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { createClient } from "@supabase/supabase-js"
import "react-toastify/dist/ReactToastify.css"

// ✅ Pages
import Register from "./pages/Register"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import UpdatePassword from "./pages/UpdatePassword"
import UpgradePage from "./pages/UpgradePage"
import ChartsPage from "./pages/ChartsPage"
import ProfilePage from "./pages/settings/ProfilePage"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

function AppRoutes() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      const publicPages = ["/login", "/register", "/forgot-password", "/reset-password"]
      const isPublic = publicPages.includes(location.pathname)

      if (!session && !isPublic) {
        navigate("/login")
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [location.pathname, navigate])

  return (
    <Routes>
      {/* 🔓 Public Pages with layout */}
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

      {/* 🔐 Protected Pages */}
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
