import { useEffect, useState } from "react"
import Layout from "@/components/layout/Layout"
import ReferralOverview from "@/components/dashboard/ReferralOverview"
import NetworkPerformance from "@/components/dashboard/NetworkPerformance"
import RecentActivity from "@/components/dashboard/RecentActivity"
import AccountSummary from "@/components/dashboard/AccountSummary"
import UpgradeNotification from "@/components/dashboard/UpgradeNotification"
import { getCurrentUser } from "@/utils/getCurrentUser"
import { supabase } from "@/utils/supabase"

function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [downline, setDownline] = useState([])
  const [komisen, setKomisen] = useState(0)
  const [levels, setLevels] = useState({})
  const [levelsDetail, setLevelsDetail] = useState({})
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const user = await getCurrentUser()
      if (!user) {
        setUserData(null)
        setLoading(false)
        return
      }

      const { data: userData, error: userError } = await supabase
        .from("users_clean_reset")
        .select("*")
        .eq("email", user.email)
        .single()

      if (userError || !userData) {
        setUserData(null)
        setLoading(false)
        return
      }

      setUserData(userData)
      setKomisen(userData.komisen || 0)

      const { data: downlineData } = await supabase
        .from("users_clean_reset")
        .select("*")
        .eq("referred_by", userData.referral_uid)

      setDownline(downlineData)

      const groupByLevel = {}
      downlineData.forEach((d) => {
        if (!groupByLevel[d.level]) groupByLevel[d.level] = []
        groupByLevel[d.level].push(d)
      })

      setLevels({
        1: groupByLevel[1]?.length || 0,
        2: groupByLevel[2]?.length || 0,
        3: groupByLevel[3]?.length || 0,
        4: groupByLevel[4]?.length || 0,
      })

      setLevelsDetail(groupByLevel)

      const recent = downlineData.map((d) => ({
        name: `${d.first_name} ${d.last_name}`,
        level: d.level,
        date: d.created_at?.split("T")[0],
      }))
      setActivity(recent)

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Layout user={{ first_name: "", referral_uid: "" }}>
        <div className="text-center py-24 text-gray-500 text-sm">🔄 Loading dashboard...</div>
      </Layout>
    )
  }

  if (!userData) {
    return (
      <Layout user={{ first_name: "", referral_uid: "" }}>
        <div className="text-center py-24 text-red-500">
          Session not found. Please <a href="/login" className="underline text-indigo-600">login again</a>.
        </div>
      </Layout>
    )
  }

  return (
    <Layout user={userData}>
      <div className="w-full px-4 md:px-10 pt-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
          {/* 🟥 Komisen */}
          <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col justify-between">
            <ReferralOverview
              data={{
                komisen,
                downline_total: downline.length,
                is_paid: userData.is_paid,
              }}
            />
          </div>

          {/* 🟨 Level */}
          <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col justify-between">
            <NetworkPerformance levels={levels} levelsDetail={levelsDetail} />
          </div>

          {/* 🟩 Aktiviti */}
          <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col justify-between">
            <RecentActivity activity={activity} />
          </div>

          {/* 🟦 Ringkasan */}
          <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col justify-between">
            <AccountSummary user={userData} />
          </div>

          {/* 📊 Reserved Chart */}
          <div className="bg-white rounded-2xl shadow p-6 h-full flex items-center justify-center text-gray-400">
            Reserved for future analytics / chart
          </div>

          {/* 🔔 Notis Upgrade */}
          <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col justify-between">
            <UpgradeNotification user={userData} downline={downline} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
