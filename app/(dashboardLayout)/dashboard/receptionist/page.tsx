"use client"
import React from "react"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Users,
  Bed,
  Clock,
  Crown,
  DollarSign,
} from "lucide-react"

import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi"
import { IBooking } from "@/types/booking.interface"
import Loader from "@/components/shared/Loader"
import DashboardStatCard from "@/components/dashboard/DashboardStatCard"
import DashboardChart from "@/components/dashboard/DashboardChart"
import DashboardTable from "@/components/dashboard/DashboardTable"
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader"

function ReceptionistDashboard() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery("receptionist", {
    refetchOnMountOrArgChange: true,
  })

  if (isLoading) {
    return <Loader />
  }

  const { 
    stats = {
      todaysBookings: 0,
      checkedInGuests: 0,
      availableRooms: 0,
      occupancyRate: "0%"
    }, 
    recentBookings = [],
    monthlyStats = []
  } = dashboardData?.data || {}

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

  const revenueData = monthlyStats.map((item: any) => ({
    name: item.month,
    amount: item.revenue,
  }));

  const occupancyData = monthlyStats.map((item: any) => ({
    name: item.month,
    bookings: item.bookings,
  }));

  const iconMap: any = {
    Calendar: Calendar,
    Users: Users,
    Bed: Bed,
  };

  return (
    <div className="p-4 md:p-8 space-y-10 pb-20">
      <DashboardSectionHeader 
        title="Receptionist Overview"
        subtitle="Manage daily operations and guest arrivals."
        icon={Crown}
        badge="Service Excellence"
        rightElement={
          <div className="flex items-center gap-6 md:gap-10">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-royal-gold font-bold mb-1">Occupancy</p>
              <p className="text-2xl font-[var(--font-cinzel)] text-foreground">{stats.occupancyRate || "0%"}</p>
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardStatCard 
          label="Today's Bookings" 
          value={stats.todaysBookings || 0} 
          subValue="New arrivals today" 
          icon={Calendar} 
          trend={{ value: "+5%", isUp: true }}
        />
        <DashboardStatCard 
          label="Checked-in Guests" 
          value={stats.checkedInGuests || 0} 
          subValue="Current residents" 
          icon={Users} 
          trend={{ value: "+10%", isUp: true }}
        />
        <DashboardStatCard 
          label="Available Rooms" 
          value={stats.availableRooms || 0} 
          subValue="Ready for occupancy" 
          icon={Bed} 
        />
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardChart 
          title="Revenue Trends"
          description="Monthly revenue distribution"
          icon={DollarSign}
          data={revenueData}
          type="area"
          dataKey="amount"
          xAxisKey="name"
          prefix="$"
        />
        <DashboardChart 
          title="Stay Volume"
          description="Guest booking patterns over time"
          icon={Calendar}
          data={occupancyData}
          type="bar"
          dataKey="bookings"
          xAxisKey="name"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DashboardTable 
            title="Recent Arrivals"
            description="Latest guest stay requests"
            icon={Clock}
            headers={['Guest', 'Suite', 'Total', 'Status']}
            viewAllLink="/dashboard/receptionist/bookings"
          >
            {recentBookings.slice(0, 5).map((booking: IBooking) => (
              <tr key={booking._id} className="hover:bg-royal-gold/5 transition-all group border-b border-royal-gold/5 last:border-0">
                <td className="px-8 py-5">
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-royal-gold transition-colors">{booking.userId?.name || 'Walk-in Guest'}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{booking.userId?.email || 'N/A'}</p>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                     <Bed className="w-3 h-3 text-royal-gold" />
                     <span className="text-xs text-foreground/80 font-medium">{booking.rooms?.[0]?.roomId?.title || 'Heritage Suite'}</span>
                  </div>
                </td>
                <td className="px-8 py-5 text-sm font-[var(--font-cinzel)] font-bold text-foreground">${booking.totalAmount}</td>
                <td className="px-8 py-5">
                  <Badge variant="outline" className={`text-[9px] uppercase tracking-widest px-2 py-0.5 border-royal-gold/20 text-royal-gold bg-royal-gold/5 ${['confirmed', 'booked'].includes(booking.bookingStatus.toLowerCase()) ? 'border-emerald-500/20 text-emerald-600 bg-emerald-500/5' : ''}`}>
                    {booking.bookingStatus}
                  </Badge>
                </td>
              </tr>
            ))}
          </DashboardTable>
        </div>

        <div className="lg:col-span-1">
          <DashboardChart 
            title="Booking Status"
            description="Distribution of recent states"
            icon={Calendar}
            data={chartData}
            type="bar"
            dataKey="value"
            xAxisKey="name"
          />
        </div>
      </div>
    </div>
  )
}

export default ReceptionistDashboard
