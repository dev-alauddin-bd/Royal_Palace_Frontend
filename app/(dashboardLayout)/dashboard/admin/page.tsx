"use client"
import React, { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Percent,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Crown,
  Sparkles,
  ShieldCheck,
} from "lucide-react"

import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi"
import { IBooking } from "@/types/booking.interface"
import Loader from "@/components/shared/Loader"

function AdminDashboard() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  // AI Insights State - 🛡️ Moved to top to follow Rules of Hooks
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

  if (!dashboardData?.success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="glass-panel p-10 text-center max-w-md border-destructive/20">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-widest mb-2">Registry Error</h2>
          <p className="text-white/60 font-light">Unable to synchronize with the royal archives. Please attempt authentication again.</p>
        </div>
      </div>
    )
  }

  const { 
    stats = {
      totalBookings: 0,
      monthlyBookings: 0,
      yearlyBookings: 0,
      todaysRevenue: 0,
      monthlyRevenue: 0,
      totalRevenue: 0,
      avgBookingValue: 0,
      occupancyRate: "0%",
      repeatCustomers: 0,
      newCustomers: 0,
      todaysBookings: 0
    }, 
    monthlyStats = [],
    topCustomers = [], 
    recentBookings = [] 
  } = dashboardData?.data || {}

  // Luxury Chart Colors
  const chartColors = {
    gold: "#c5a021",
    goldLight: "#e6be8a",
    obsidian: "#0a0d12",
    white: "#ffffff",
    grey: "#475569"
  }

  const revenueData = monthlyStats.map((item: any) => ({
    name: item.month,
    amount: item.revenue,
  }));

  const bookingData = monthlyStats.map((item: any) => ({
    name: item.month,
    bookings: item.bookings,
  }));

  const customerData = topCustomers.slice(0, 5).map((customer: any) => ({
    name: customer.name.length > 15 ? customer.name.substring(0, 15) + "..." : customer.name,
    spent: customer.totalSpent,
  }))

  return (
    <div className="p-4 md:p-8 space-y-10 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-royal-gold">
            <Crown className="h-5 w-5" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Royal Management</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Sovereign Overview</h1>
          <p className="text-white/40 text-sm font-light max-w-md">Welcome back, Administrator. Here is the current state of your exquisite domain.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-[9px] uppercase tracking-widest text-royal-gold font-bold">Current Occupancy</p>
            <p className="text-2xl font-serif text-white">{stats.occupancyRate}</p>
          </div>
          <div className="h-12 w-[1px] bg-white/10 hidden md:block" />
          <div className="text-right">
            <p className="text-[9px] uppercase tracking-widest text-royal-gold font-bold">Today's Revenue</p>
            <p className="text-2xl font-serif text-white">${stats.todaysRevenue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Heritage", value: stats.totalBookings, sub: `${stats.monthlyBookings} this month`, icon: Calendar, color: "gold" },
          { label: "Total Wealth", value: `$${stats.totalRevenue.toLocaleString()}`, sub: `$${stats.monthlyRevenue.toLocaleString()} this month`, icon: DollarSign, color: "gold" },
          { label: "Guest Value", value: `$${stats.avgBookingValue}`, sub: "Average per stay", icon: TrendingUp, color: "gold" },
          { label: "New Allegiances", value: stats.newCustomers, sub: "Loyal members growing", icon: Users, color: "gold" }
        ].map((stat, i) => (
          <Card key={i} className="glass-panel border-white/5 hover:border-royal-gold/30 transition-all duration-500 group overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-[10px] uppercase tracking-widest text-royal-gold/60 font-bold group-hover:text-royal-gold transition-colors">{stat.label}</span>
              <stat.icon className="h-4 w-4 text-royal-gold/40 group-hover:text-royal-gold transition-colors" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-white mb-1">{stat.value}</div>
              <p className="text-[10px] text-white/40 font-light">{stat.sub}</p>
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-royal-gold group-hover:w-full transition-all duration-700" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Insights Section */}
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
        {/* Decorative background element */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-royal-gold/5 blur-3xl rounded-full" />
      </Card>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Revenue Chart */}
        <Card className="lg:col-span-2 glass-panel border-white/5">
          <CardHeader>
            <CardTitle className="text-lg font-serif text-white flex items-center gap-3">
              <TrendingUp className="h-5 w-5 text-royal-gold" />
              Wealth Projection
            </CardTitle>
            <CardDescription className="text-white/40 text-xs uppercase tracking-widest">Revenue breakdown by lunar period</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.gold} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={chartColors.gold} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0f141d", border: "1px solid rgba(197, 160, 33, 0.2)", borderRadius: "0px" }}
                  itemStyle={{ color: chartColors.gold, fontSize: "12px" }}
                  labelStyle={{ color: "white", marginBottom: "4px" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke={chartColors.gold} 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Patrons */}
        <Card className="glass-panel border-white/5">
          <CardHeader>
            <CardTitle className="text-lg font-serif text-white flex items-center gap-3">
              <Crown className="h-5 w-5 text-royal-gold" />
              Elite Patrons
            </CardTitle>
            <CardDescription className="text-white/40 text-xs uppercase tracking-widest">Most distinguished guests</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-6">
              {topCustomers.slice(0, 5).map((customer: any, i: number) => (
                <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 border border-royal-gold/20 flex items-center justify-center text-royal-gold font-serif text-sm group-hover:border-royal-gold transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-royal-gold transition-colors">{customer.name}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-light">{customer.bookings} Bookings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-serif text-white">${customer.totalSpent.toLocaleString()}</p>
                    <div className="h-[1px] w-full bg-royal-gold/20 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        {/* Recent Activity */}
        <Card className="glass-panel border-white/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-lg font-serif text-white flex items-center gap-3">
                <Clock className="h-5 w-5 text-royal-gold" />
                Recent Registry
              </CardTitle>
              <CardDescription className="text-white/40 text-xs uppercase tracking-widest">Latest stay requests</CardDescription>
            </div>
            <button className="text-[10px] text-royal-gold uppercase tracking-[0.3em] font-bold hover:text-white transition-colors">View All</button>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-4">
              {recentBookings.slice(0, 5).map((booking: IBooking) => (
                <div key={booking._id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-royal-gold/20 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className={`h-2 w-2 rounded-full ${
                      booking.bookingStatus === "booked" ? "bg-green-500" : 
                      booking.bookingStatus === "pending" ? "bg-amber-500" : "bg-red-500"
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-royal-gold transition-colors">{booking.userId.name}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{booking.userId.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-serif text-white">${booking.totalAmount}</p>
                    <Badge variant="outline" className={`text-[8px] uppercase tracking-widest rounded-none border-royal-gold/30 text-royal-gold h-5`}>
                      {booking.bookingStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Heritage Metrics */}
        <Card className="glass-panel border-white/5">
          <CardHeader>
            <CardTitle className="text-lg font-serif text-white flex items-center gap-3">
              <BarChart className="h-5 w-5 text-royal-gold" />
              Heritage Metrics
            </CardTitle>
            <CardDescription className="text-white/40 text-xs uppercase tracking-widest">Operational performance</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] pt-4">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.3)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip 
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{ backgroundColor: "#0f141d", border: "1px solid rgba(197, 160, 33, 0.2)", borderRadius: "0px" }}
                  itemStyle={{ color: chartColors.gold, fontSize: "12px" }}
                />
                <Bar dataKey="bookings" fill={chartColors.gold} radius={[0, 0, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
