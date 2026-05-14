"use client"
import React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  Bed,
  Clock,
  Crown,
} from "lucide-react"

import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi"
import { IBooking } from "@/types/booking.interface"
import Loader from "@/components/shared/Loader"
import DashboardStatCard from "@/components/dashboard/DashboardStatCard"
import DashboardChart from "@/components/dashboard/DashboardChart"
import DashboardTable from "@/components/dashboard/DashboardTable"
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader"

function ReceptionistDashboard() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  if (isLoading) {
    return <Loader />
  }

  const { 
    stats = [], 
    recentBookings = [] 
  } = dashboardData || {}

  // Calculate booking status counts for a chart
  const statusCount: Record<string, number> = {};
  recentBookings.forEach((booking: IBooking) => {
    const status = booking.bookingStatus || 'unknown';
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  const chartData = Object.entries(statusCount).map(([name, value]) => ({
    name: name.toUpperCase(),
    value,
  }));

  const iconMap: any = {
    Calendar: Calendar,
    Users: Users,
    Bed: Bed,
  };

  return (
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-700">
      <DashboardSectionHeader 
        title="Reception Desk"
        subtitle="Ensure every guest experiences the royal treatment from check-in to check-out."
        icon={Crown}
        badge="Service Excellence"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat: any, i: number) => (
          <DashboardStatCard 
            key={i}
            label={stat.title} 
            value={stat.value} 
            subValue={`${stat.change} vs yesterday`} 
            icon={iconMap[stat.icon] || Users} 
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <DashboardTable 
          title="Recent Arrivals"
          description="Latest guest stay requests"
          icon={Clock}
          headers={['Guest', 'Suite', 'Investment', 'Status']}
          viewAllLink="/dashboard/receptionist/bookings"
        >
          {recentBookings.slice(0, 5).map((booking: IBooking) => (
            <tr key={booking._id} className="hover:bg-white/5 transition-all group">
              <td className="px-8 py-6">
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-royal-gold transition-colors">{booking.userId?.name || 'Walk-in Guest'}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{booking.userId?.email || 'N/A'}</p>
                </div>
              </td>
              <td className="px-8 py-6 text-white/60 text-sm font-light">
                {booking.rooms?.[0]?.roomId?.title || 'Heritage Suite'}
              </td>
              <td className="px-8 py-6 text-sm font-serif text-white">${booking.totalAmount}</td>
              <td className="px-8 py-6">
                <Badge variant="outline" className="text-[8px] uppercase tracking-widest rounded-none border-royal-gold/30 text-royal-gold">
                  {booking.bookingStatus}
                </Badge>
              </td>
            </tr>
          ))}
        </DashboardTable>

        <DashboardChart 
          title="Booking Overview"
          description="Status distribution of recent bookings"
          icon={Calendar}
          data={chartData}
          type="bar"
          dataKey="value"
          xAxisKey="name"
        />
      </div>
    </div>
  )
}

export default ReceptionistDashboard
