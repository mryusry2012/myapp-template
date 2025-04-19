// src/pages/Dashboard.jsx
import { useEffect, useState } from "react"
import Layout from "@/components/layout/Layout"
import ReferralOverview from "@/components/dashboard/ReferralOverview"
import NetworkPerformance from "@/components/dashboard/NetworkPerformance"
import RecentActivity from "@/components/dashboard/RecentActivity"
import UpgradeNotification from "@/components/dashboard/UpgradeNotification"
import { supabase } from "@/utils/supabase"
import { getCurrentUser } from "@/utils/getCurrentUser"

function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [downline, setDownline] = useState([])
  const [komisen, setKomisen] = useState(0)
  const [levels, setLevels] = useState({})
  const [levelsDetail, setLevelsDetail] = useState({})
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      let user = await getCurrentUser()
      if (!user) {
        const storedUser = localStorage.getItem("user")
        if (storedUser) user = JSON.parse(storedUser)
      }

      if (!user) {
        setUserData(null)
        setLoading(false)
        return
      }

      const { data: profile } = await supabase
        .from("users_clean_reset")
        .select("*")
        .eq("email", user.email)
        .single()

      if (!profile) {
        setUserData(null)
        setLoading(false)
        return
      }

      setUserData(profile)
      setKomisen(profile.komisen || 0)

      const { data: downlineData } = await supabase
        .from("users_clean_reset")
        .select("*")
        .eq("referred_by", profile.referral_uid)

      setDownline(downlineData)

      const grouped = {}
      downlineData.forEach((u) => {
        if (!grouped[u.level]) grouped[u.level] = []
        grouped[u.level].push(u)
      })

      setLevels({
        1: grouped[1]?.length || 0,
        2: grouped[2]?.length || 0,
        3: grouped[3]?.length || 0,
        4: grouped[4]?.length || 0,
      })

      setLevelsDetail(grouped)

      const recent = downlineData.map((u) => ({
        name: `${u.first_name} ${u.last_name}`,
        level: u.level,
        date: u.created_at?.split("T")[0],
      }))

      setActivity(recent)
      setLoading(false)
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <Layout user={{ first_name: "", referral_uid: "" }}>
        <div className="text-center py-20 text-gray-500">🔄 Loading dashboard...</div>
      </Layout>
    )
  }

  if (!userData) {
    return (
      <Layout user={{ first_name: "", referral_uid: "" }}>
        <div className="text-center py-24 text-red-600">
          Session not found. Please <a href="/login" className="underline text-indigo-600">login again</a>.
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={userData}>
      <div className="w-full px-4 md:px-10 pt-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
          <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col justify-between">
            <ReferralOverview data={{
              komisen,
              downline_total: downline.length,
              is_paid: userData.is_paid,
            }} />
          </div>

          <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col justify-between">
            <NetworkPerformance levels={levels} levelsDetail={levelsDetail} />
          </div>

          <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col justify-between">
            <RecentActivity activity={activity} />
          </div>

          <div className="bg-white rounded-2xl shadow p-6 h-full flex items-center justify-center text-gray-400">
            Reserved for future analytics / chart
          </div>

          <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col justify-between">
            <UpgradeNotification user={userData} downline={downline} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
