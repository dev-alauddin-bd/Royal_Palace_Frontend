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
  ArrowUpRight,
} from "lucide-react"

import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi"
import { IBooking } from "@/types/booking.interface"
import Loader from "@/components/shared/Loader"
import DashboardStatCard from "@/components/dashboard/DashboardStatCard"
import DashboardChart from "@/components/dashboard/DashboardChart"
import DashboardTable from "@/components/dashboard/DashboardTable"
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader"
import { motion } from "framer-motion"

function AdminDashboard() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery('admin', {
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
    <div className="p-4 md:p-8 space-y-10">
      <DashboardSectionHeader 
        title="Admin Dashboard"
        subtitle="Strategic overview of the palace collection performance."
        icon={Crown}
        rightElement={
          <div className="flex items-center gap-6 md:gap-10">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-royal-gold font-bold mb-1">Occupancy</p>
              <p className="text-2xl font-[var(--font-cinzel)] text-foreground">{stats.occupancyRate}</p>
            </div>
            <div className="h-10 w-[1px] bg-royal-gold/20" />
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-royal-gold font-bold mb-1">Today's Revenue</p>
              <p className="text-2xl font-[var(--font-cinzel)] text-foreground">${stats.todaysRevenue.toLocaleString()}</p>
            </div>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStatCard 
          label="Total Bookings" 
          value={stats.totalBookings} 
          subValue={`${stats.monthlyBookings} this month`} 
          icon={Calendar} 
          trend={{ value: "12%", isUp: true }}
        />
        <DashboardStatCard 
          label="Total Revenue" 
          value={`$${stats.totalRevenue.toLocaleString()}`} 
          subValue={`$${stats.monthlyRevenue.toLocaleString()} this month`} 
          icon={DollarSign} 
        />
        <DashboardStatCard 
          label="Avg Booking Value" 
          value={`$${stats.avgBookingValue}`} 
          subValue="Per guest stay" 
          icon={TrendingUp} 
        />
        <DashboardStatCard 
          label="New Guests" 
          value={stats.newCustomers} 
          subValue="Loyal community growing" 
          icon={Users} 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass-panel border-royal-gold/20 bg-royal-gold/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-6">
            <Sparkles className={`w-5 h-5 text-royal-gold ${isAiLoading ? "animate-spin" : "animate-pulse"}`} />
          </div>
          <CardHeader>
            <CardTitle className="text-lg font-[var(--font-cinzel)] text-foreground flex items-center gap-3">
              <ShieldCheck className="h-5 w-5 text-royal-gold" />
              Sovereign AI Insights
            </CardTitle>
            <CardDescription className="text-accent-foreground text-[10px] uppercase tracking-[0.2em] font-bold mt-1">Intelligent registry analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-foreground/80 leading-relaxed font-medium italic min-h-[60px]">
                {isAiLoading && !aiInsight ? (
                  <span className="animate-pulse">Consulting the royal archives...</span>
                ) : (
                  <>"{aiInsight}"</>
                )}
              </div>
              <div className="flex gap-3">
                <Badge variant="outline" className="border-royal-gold/20 text-royal-gold text-[9px] uppercase tracking-widest px-3 py-1 bg-royal-gold/5">Growth Potential</Badge>
                <Badge variant="outline" className="border-royal-gold/20 text-royal-gold text-[9px] uppercase tracking-widest px-3 py-1 bg-royal-gold/5">Guest Loyalty</Badge>
              </div>
            </div>
          </CardContent>
          {/* Background Decorative Gradient */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-royal-gold/10 blur-3xl rounded-full -z-10" />
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 h-full">
          <DashboardChart 
            title="Revenue Analytics"
            description="Wealth breakdown by lunar cycle"
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
          headers={['Patron', 'Spent']}
        >
          {topCustomers.slice(0, 5).map((customer: any, i: number) => (
            <tr key={i} className="hover:bg-royal-gold/5 transition-all group border-b border-royal-gold/5 last:border-0">
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center text-royal-gold font-[var(--font-cinzel)] text-sm group-hover:bg-royal-gold/20 transition-colors">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground group-hover:text-royal-gold transition-colors">{customer.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{customer.email}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5 text-sm font-[var(--font-cinzel)] font-bold text-foreground">${customer.totalSpent.toLocaleString()}</td>
            </tr>
          ))}
        </DashboardTable>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        <div className="lg:col-span-2">
           <DashboardChart 
            title="Stay Metrics"
            description="Booking volume across period cycles"
            icon={Calendar}
            data={bookingData}
            type="bar"
            dataKey="bookings"
            xAxisKey="name"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-panel p-8 border-royal-gold/10 flex flex-col items-center justify-center text-center space-y-6 bg-royal-gold/5"
        >
          <div className="h-16 w-16 bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center rounded-full">
            <Sparkles className="h-6 w-6 text-royal-gold" />
          </div>
          <div>
            <h4 className="font-[var(--font-cinzel)] font-bold text-foreground">Operational Excellence</h4>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Day-to-day operations are being managed by the Royal Concierge. Focus on the sovereign growth and patron registry.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminDashboard
