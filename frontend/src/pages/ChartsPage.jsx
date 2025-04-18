// src/pages/ChartsPage.jsx
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar
  } from "recharts"
  
  const komisenData = [
    { date: 'Apr 1', amount: 20 },
    { date: 'Apr 5', amount: 35 },
    { date: 'Apr 10', amount: 40 },
    { date: 'Apr 15', amount: 55 },
    { date: 'Apr 18', amount: 85 },
  ]
  
  const downlineData = [
    { level: 'Level 1', count: 3 },
    { level: 'Level 2', count: 1 },
    { level: 'Level 3', count: 1 },
    { level: 'Level 4', count: 0 },
  ]
  
  export default function ChartsPage() {
    return (
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <div className="max-w-screen-lg mx-auto space-y-12">
  
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Commission Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={komisenData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="amount" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
  
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Downline by Level</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={downlineData}>
                <XAxis dataKey="level" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                <Bar dataKey="count" fill="#22c55e" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
  
        </div>
      </div>
    )
  }
  