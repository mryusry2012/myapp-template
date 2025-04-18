// src/components/DashboardCard.jsx
function DashboardCard({ title, value, icon: Icon, bgColor = "bg-blue-50" }) {
    return (
      <div className={`flex items-center p-5 rounded-xl shadow ${bgColor} w-full gap-4`}>
        {Icon && <Icon className="w-6 h-6 text-blue-700" />}
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-lg font-semibold text-gray-800">{value}</p>
        </div>
      </div>
    )
  }
  
  export default DashboardCard
  