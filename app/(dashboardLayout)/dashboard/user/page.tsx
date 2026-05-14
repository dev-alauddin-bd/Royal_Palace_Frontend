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
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery('guest', {
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
    <div className="p-4 md:p-8 space-y-10">
      <DashboardSectionHeader 
        title="Guest Overview"
        subtitle="Review your current stays and plan your next visit."
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
        title="Monthly Spending"
        description="Monthly overview of your luxury stays"
        icon={DollarSign}
        data={spendingHistory}
        type="bar"
        dataKey="amount"
        xAxisKey="month"
        prefix="$"
      />

      <div className="grid grid-cols-1 gap-8 pb-10">
        <DashboardTable 
          title="Upcoming Stays"
          description="Your current and future reservations"
          icon={Clock}
          headers={['Suite', 'Arrival', 'Departure', 'Total', 'Status']}
          viewAllLink="/dashboard/user/bookings"
        >
          {recentBookings.map((booking: IBooking) => (
            <tr key={booking._id} className="hover:bg-royal-gold/5 transition-all group border-b border-royal-gold/5 last:border-0">
              <td className="px-8 py-5 text-foreground font-[var(--font-cinzel)] font-bold">
                {booking.rooms?.[0]?.roomId?.title || 'Heritage Suite'}
              </td>
              <td className="px-8 py-5 text-muted-foreground text-sm font-medium">
                {booking.rooms?.[0]?.checkInDate ? new Date(booking.rooms[0].checkInDate).toLocaleDateString() : '-'}
              </td>
              <td className="px-8 py-5 text-muted-foreground text-sm font-medium">
                {booking.rooms?.[0]?.checkOutDate ? new Date(booking.rooms[0].checkOutDate).toLocaleDateString() : '-'}
              </td>
              <td className="px-8 py-5 text-sm font-[var(--font-cinzel)] font-bold text-foreground">${booking.totalAmount}</td>
              <td className="px-8 py-5">
                <Badge variant="outline" className={`text-[9px] uppercase tracking-widest px-2 py-0.5 border-royal-gold/20 text-royal-gold bg-royal-gold/5 ${booking.bookingStatus === 'Confirmed' ? 'border-emerald-500/20 text-emerald-600 bg-emerald-500/5' : ''}`}>
                  {booking.bookingStatus}
                </Badge>
              </td>
            </tr>
          ))}
          {recentBookings.length === 0 && (
            <tr>
              <td colSpan={5} className="px-8 py-10 text-center text-muted-foreground italic">No upcoming stay requests found.</td>
            </tr>
          )}
        </DashboardTable>

        <DashboardTable 
          title="Past Stays"
          description="A history of your previous visits"
          icon={Calendar}
          headers={['Suite', 'Check-out', 'Total', 'Status']}
        >
          {pastBookings.map((booking: IBooking) => (
            <tr key={booking._id} className="hover:bg-royal-gold/5 transition-all group border-b border-royal-gold/5 last:border-0">
              <td className="px-8 py-5 text-foreground font-[var(--font-cinzel)]">
                {booking.rooms?.[0]?.roomId?.title || 'Heritage Suite'}
              </td>
              <td className="px-8 py-5 text-muted-foreground text-sm">
                {booking.rooms?.[0]?.checkOutDate ? new Date(booking.rooms[0].checkOutDate).toLocaleDateString() : '-'}
              </td>
              <td className="px-8 py-5 text-sm font-[var(--font-cinzel)] text-foreground">${booking.totalAmount}</td>
              <td className="px-8 py-5">
                <Badge variant="outline" className="text-[9px] uppercase tracking-widest px-2 py-0.5 border-border text-muted-foreground">
                  {booking.bookingStatus}
                </Badge>
              </td>
            </tr>
          ))}
          {pastBookings.length === 0 && (
            <tr>
              <td colSpan={4} className="px-8 py-10 text-center text-muted-foreground italic">No past experiences recorded.</td>
            </tr>
          )}
        </DashboardTable>
      </div>
    </div>
  )
}

export default GuestDashboard
