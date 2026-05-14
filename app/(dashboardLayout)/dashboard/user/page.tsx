"use client"
import React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Bed,
  Clock,
  DollarSign,
  Crown,
} from "lucide-react"

import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi"
import { IBooking } from "@/types/booking.interface"
import Loader from "@/components/shared/Loader"
import DashboardStatCard from "@/components/dashboard/DashboardStatCard"
import DashboardChart from "@/components/dashboard/DashboardChart"
import DashboardTable from "@/components/dashboard/DashboardTable"
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader"

function GuestDashboard() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  if (isLoading) {
    return <Loader />
  }

  const { 
    stats = [], 
    recentBookings = [],
    pastBookings = [],
    spendingHistory = []
  } = dashboardData?.data || {}

  const iconMap: any = {
    Bed: Bed,
    Calendar: Calendar,
    DollarSign: DollarSign,
  };

  return (
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-700">
      <DashboardSectionHeader 
        title="My Royal Residence"
        subtitle="Welcome back to your exquisite domain. Review your heritage and plan your next stay."
        icon={Crown}
        badge="Guest Experience"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat: any, i: number) => (
          <DashboardStatCard 
            key={i}
            label={stat.title} 
            value={stat.value} 
            icon={iconMap[stat.icon] || DollarSign} 
          />
        ))}
      </div>

      <DashboardChart 
        title="Spending History"
        description="Your investment in luxury over the past lunar periods"
        icon={DollarSign}
        data={spendingHistory}
        type="bar"
        dataKey="amount"
        xAxisKey="month"
        prefix="$"
      />

      <div className="grid grid-cols-1 gap-8 pb-10">
        <DashboardTable 
          title="Recent Bookings"
          description="Your current and upcoming stay requests"
          icon={Clock}
          headers={['Suite', 'Arrival', 'Departure', 'Investment', 'Status']}
          viewAllLink="/dashboard/user/bookings"
        >
          {recentBookings.map((booking: IBooking) => (
            <tr key={booking._id} className="hover:bg-white/5 transition-all group">
              <td className="px-8 py-6 text-white font-serif font-bold">
                {booking.rooms?.[0]?.roomId?.title || 'Heritage Suite'}
              </td>
              <td className="px-8 py-6 text-white/60 text-sm font-light">
                {booking.rooms?.[0]?.checkInDate ? new Date(booking.rooms[0].checkInDate).toLocaleDateString() : '-'}
              </td>
              <td className="px-8 py-6 text-white/60 text-sm font-light">
                {booking.rooms?.[0]?.checkOutDate ? new Date(booking.rooms[0].checkOutDate).toLocaleDateString() : '-'}
              </td>
              <td className="px-8 py-6 text-sm font-serif text-white">${booking.totalAmount}</td>
              <td className="px-8 py-6">
                <Badge variant="outline" className={`text-[8px] uppercase tracking-widest rounded-none border-royal-gold/30 text-royal-gold`}>
                  {booking.bookingStatus}
                </Badge>
              </td>
            </tr>
          ))}
        </DashboardTable>

        <DashboardTable 
          title="Past Experiences"
          description="Chronicles of your previous visits"
          icon={Calendar}
          headers={['Suite', 'Check-out', 'Investment', 'Status']}
        >
          {pastBookings.map((booking: IBooking) => (
            <tr key={booking._id} className="hover:bg-white/5 transition-all group">
              <td className="px-8 py-6 text-white font-serif">
                {booking.rooms?.[0]?.roomId?.title || 'Heritage Suite'}
              </td>
              <td className="px-8 py-6 text-white/60 text-sm font-light">
                {booking.rooms?.[0]?.checkOutDate ? new Date(booking.rooms[0].checkOutDate).toLocaleDateString() : '-'}
              </td>
              <td className="px-8 py-6 text-sm font-serif text-white">${booking.totalAmount}</td>
              <td className="px-8 py-6">
                <Badge variant="outline" className="text-[8px] uppercase tracking-widest rounded-none border-white/10 text-white/40">
                  {booking.bookingStatus}
                </Badge>
              </td>
            </tr>
          ))}
        </DashboardTable>
      </div>
    </div>
  )
}

export default GuestDashboard
