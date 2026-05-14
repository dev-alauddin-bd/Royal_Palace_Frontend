"use client"
import React, { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Clock,
  Crown,
  Sparkles,
  ShieldCheck,
} from "lucide-react"

import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi"
import { IBooking } from "@/types/booking.interface"
import Loader from "@/components/shared/Loader"
import DashboardStatCard from "@/components/dashboard/DashboardStatCard"
import DashboardChart from "@/components/dashboard/DashboardChart"
import DashboardTable from "@/components/dashboard/DashboardTable"
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader"

function AdminDashboard() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  const [aiInsight, setAiInsight] = useState<string>("")
  const [isAiLoading, setIsAiLoading] = useState(false)

  useEffect(() => {
    if (dashboardData?.data?.stats) {
      const fetchAiInsights = async () => {
        setIsAiLoading(true);
        try {
          const response = await fetch('/api/admin/insights', {
            method: 'POST',
            body: JSON.stringify({ stats: dashboardData.data.stats }),
          });
          
          if (!response.body) return;
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let accumulatedText = "";
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            accumulatedText += decoder.decode(value, { stream: true });
            setAiInsight(accumulatedText);
          }
        } catch (error) {
          setAiInsight("The royal archives are temporarily inaccessible. Please try again shortly.");
        } finally {
          setIsAiLoading(false);
        }
      };

      fetchAiInsights();
    }
  }, [dashboardData])

  if (isLoading) {
    return <Loader />
  }

  const { 
    stats = {
      totalBookings: 0,
      monthlyBookings: 0,
      totalRevenue: 0,
      monthlyRevenue: 0,
      todaysRevenue: 0,
      avgBookingValue: 0,
      occupancyRate: "0%",
      newCustomers: 0
    }, 
    monthlyStats = [],
    topCustomers = [], 
    recentBookings = [] 
  } = dashboardData?.data || {}

  const revenueData = monthlyStats.map((item: any) => ({
    name: item.month,
    amount: item.revenue,
  }));

  const bookingData = monthlyStats.map((item: any) => ({
    name: item.month,
    bookings: item.bookings,
  }));

  return (
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-700">
      <DashboardSectionHeader 
        title="Sovereign Overview"
        subtitle="Welcome back, Administrator. Here is the current state of your exquisite domain."
        icon={Crown}
        rightElement={
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-royal-gold font-bold">Occupancy</p>
              <p className="text-2xl font-serif text-white">{stats.occupancyRate}</p>
            </div>
            <div className="h-12 w-[1px] bg-white/10" />
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-royal-gold font-bold">Today's Revenue</p>
              <p className="text-2xl font-serif text-white">${stats.todaysRevenue.toLocaleString()}</p>
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStatCard 
          label="Total Heritage" 
          value={stats.totalBookings} 
          subValue={`${stats.monthlyBookings} this month`} 
          icon={Calendar} 
        />
        <DashboardStatCard 
          label="Total Wealth" 
          value={`$${stats.totalRevenue.toLocaleString()}`} 
          subValue={`$${stats.monthlyRevenue.toLocaleString()} this month`} 
          icon={DollarSign} 
        />
        <DashboardStatCard 
          label="Guest Value" 
          value={`$${stats.avgBookingValue}`} 
          subValue="Average per stay" 
          icon={TrendingUp} 
        />
        <DashboardStatCard 
          label="New Allegiances" 
          value={stats.newCustomers} 
          subValue="Loyal members growing" 
          icon={Users} 
        />
      </div>

      <Card className="glass-panel border-royal-gold/20 bg-royal-gold/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4">
          <Sparkles className={`w-5 h-5 text-royal-gold ${isAiLoading ? "animate-spin" : "animate-pulse"}`} />
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-serif text-white flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-royal-gold" />
            Sovereign AI Insights
          </CardTitle>
          <CardDescription className="text-royal-gold/60 text-[10px] uppercase tracking-widest font-bold">Intelligent registry analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-white/80 leading-relaxed font-light italic min-h-[60px]">
              {isAiLoading && !aiInsight ? (
                <span className="animate-pulse">Synchronizing with the divine logic...</span>
              ) : (
                <>"{aiInsight}"</>
              )}
            </div>
            <div className="flex gap-4">
              <Badge variant="outline" className="border-royal-gold/20 text-royal-gold text-[8px] uppercase tracking-tighter">Growth Opportunity</Badge>
              <Badge variant="outline" className="border-royal-gold/20 text-royal-gold text-[8px] uppercase tracking-tighter">High Retention</Badge>
            </div>
          </div>
        </CardContent>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-royal-gold/5 blur-3xl rounded-full" />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DashboardChart 
            title="Wealth Projection"
            description="Revenue breakdown by lunar period"
            icon={TrendingUp}
            data={revenueData}
            type="area"
            dataKey="amount"
            xAxisKey="name"
            prefix="$"
          />
        </div>

        <DashboardTable 
          title="Elite Patrons"
          description="Most distinguished guests"
          icon={Crown}
          headers={['Patron', 'Bookings', 'Spent']}
        >
          {topCustomers.slice(0, 5).map((customer: any, i: number) => (
            <tr key={i} className="hover:bg-white/5 transition-all group">
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 border border-royal-gold/20 flex items-center justify-center text-royal-gold font-serif text-sm group-hover:border-royal-gold transition-colors">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-royal-gold transition-colors">{customer.name}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-light">{customer.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6 text-white/60 text-sm font-light">{customer.bookings}</td>
              <td className="px-8 py-6 text-sm font-serif text-white">${customer.totalSpent.toLocaleString()}</td>
            </tr>
          ))}
        </DashboardTable>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <DashboardTable 
          title="Recent Registry"
          description="Latest stay requests"
          icon={Clock}
          headers={['Guest', 'Status', 'Investment']}
          viewAllLink="/dashboard/admin/bookings"
        >
          {recentBookings.slice(0, 5).map((booking: IBooking) => (
            <tr key={booking._id} className="hover:bg-white/5 transition-all group">
              <td className="px-8 py-6">
                <div>
                  <p className="text-sm font-medium text-white group-hover:text-royal-gold transition-colors">{booking.userId?.name}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{booking.userId?.email}</p>
                </div>
              </td>
              <td className="px-8 py-6">
                <Badge variant="outline" className="text-[8px] uppercase tracking-widest rounded-none border-royal-gold/30 text-royal-gold">
                  {booking.bookingStatus}
                </Badge>
              </td>
              <td className="px-8 py-6 text-sm font-serif text-white">${booking.totalAmount}</td>
            </tr>
          ))}
        </DashboardTable>

        <DashboardChart 
          title="Heritage Metrics"
          description="Operational performance"
          icon={TrendingUp}
          data={bookingData}
          type="bar"
          dataKey="bookings"
          xAxisKey="name"
        />
      </div>
    </div>
  )
}

export default AdminDashboard
