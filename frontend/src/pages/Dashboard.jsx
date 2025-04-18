import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

import Layout from "@/components/layout/Layout"
import ReferralOverview from "@/components/dashboard/ReferralOverview"
import NetworkPerformance from "@/components/dashboard/NetworkPerformance"
import RecentActivity from "@/components/dashboard/RecentActivity"
import AccountSummary from "@/components/dashboard/AccountSummary"
import UpgradeNotification from "@/components/dashboard/UpgradeNotification"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [downline, setDownline] = useState([])
  const [komisen, setKomisen] = useState(0)
  const [levels, setLevels] = useState({})
  const [levelsDetail, setLevelsDetail] = useState({})
  const [activity, setActivity] = useState([])

  const currentUserUID = "MVM 923149 SY" // Replace later with session logic

  useEffect(() => {
    const fetchData = async () => {
      const { data: user } = await supabase
        .from("users_clean_reset")
        .select("*")
        .eq("referral_uid", currentUserUID)
        .single()

      setUserData(user)
      setKomisen(user?.komisen || 0)

      const { data: downlineData } = await supabase
        .from("users_clean_reset")
        .select("*")
        .eq("referred_by", currentUserUID)

      setDownline(downlineData)

      const groupByLevel = {}
      downlineData.forEach((user) => {
        if (!groupByLevel[user.level]) groupByLevel[user.level] = []
        groupByLevel[user.level].push(user)
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
    }

    fetchData()
  }, [])

  if (!userData) return <div className="text-center py-12">Loading...</div>

  return (
    <Layout user={userData}>
      <div className="min-h-screen bg-gray-100 px-4 md:px-10 py-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {/* 🟥 Referral */}
          <div className="bg-white rounded-2xl shadow p-6 min-h-[220px] flex flex-col justify-between">
            <ReferralOverview
              data={{
                komisen,
                downline_total: downline.length,
                is_paid: userData.is_paid,
              }}
            />
          </div>

          {/* 🟨 Network */}
          <div className="bg-white rounded-2xl shadow p-6 min-h-[220px] flex flex-col justify-between">
            <NetworkPerformance levels={levels} levelsDetail={levelsDetail} />
          </div>

          {/* 🟩 Activity */}
          <div className="bg-white rounded-2xl shadow p-6 min-h-[220px] flex flex-col justify-between">
            <RecentActivity activity={activity} />
          </div>

          {/* 🟦 Summary */}
          <div className="bg-white rounded-2xl shadow p-6 min-h-[220px] flex flex-col justify-between">
            <AccountSummary user={userData} />
          </div>

          {/* 🟪 Placeholder (future chart) */}
          <div className="bg-white rounded-2xl shadow p-6 min-h-[220px] flex items-center justify-center text-gray-400">
            Reserved for future analytics / chart
          </div>

          {/* ⬛ Upgrade Notification */}
          <div className="bg-white rounded-2xl shadow p-6 min-h-[220px] flex flex-col justify-between">
            <UpgradeNotification user={userData} downline={downline} />
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
