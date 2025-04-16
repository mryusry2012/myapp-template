import React, { useState } from 'react'
import api from '../services/api'
import { getReferralUID } from '../utils/cookies' // ✅ case betul, lowercase
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from '@/components/ui/card'

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      const referralUID = getReferralUID() // ✅ dapat dari cookie

      const res = await api.post('/auth/register', {
        ...form,
        referredBy: referralUID || null,
      })

      setSuccess(`Register success! Member ID: ${res.data.referralUID}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <Card className="w-full max-w-md border bg-card text-card-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Name</label>
              <Input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Email</label>
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Password</label>
              <Input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
