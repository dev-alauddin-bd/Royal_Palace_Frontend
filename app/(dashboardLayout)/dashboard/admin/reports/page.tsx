"use client"

import { BarChart3, Download, Filter, Calendar as CalendarIcon, TrendingUp, DollarSign, PieChart, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader"
import { motion } from "framer-motion"
import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi"
import DashboardChart from "@/components/dashboard/DashboardChart"
import Loader from "@/components/shared/Loader"

export default function ReportsPage() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery("admin")

  if (isLoading) return <Loader />

  const { 
    stats = {}, 
    monthlyStats = [] 
  } = dashboardData?.data || {}

  const revenueData = monthlyStats.map((item: any) => ({
    name: item.month,
    amount: item.revenue,
  }));

  const occupancyData = monthlyStats.map((item: any) => ({
    name: item.month,
    bookings: item.bookings,
  }));

  return (
    <div className="p-4 md:p-8 space-y-10">
      {/* ===== Header Section ===== */}
      <DashboardSectionHeader 
        title="Reports"
        subtitle="Detailed insights into financial and operational performance."
        icon={BarChart3}
        rightElement={
          <div className="flex gap-3">
            <button className="h-12 px-6 border border-royal-gold/20 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-royal-gold hover:border-royal-gold transition-all font-bold">
              <Filter className="h-4 w-4 mr-2 inline-block" />
              FILTER
            </button>
            <button className="royal-button !h-12 group">
              <Download className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform" />
              EXPORT DATA
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Annual Revenue", value: `$${(stats.totalRevenue || 0).toLocaleString()}`, trend: "+12.5%", desc: "Lifetime yield", icon: TrendingUp },
          { title: "Monthly Performance", value: `$${(stats.monthlyRevenue || 0).toLocaleString()}`, trend: "+8.2%", desc: "Current cycle", icon: PieChart },
          { title: "Occupancy Rate", value: stats.occupancyRate || "0%", trend: "+15.0%", desc: "Suite utilization", icon: DollarSign }
        ].map((report, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-panel border-royal-gold/10 shadow-sm dark:shadow-none hover:border-royal-gold/30 transition-all group overflow-hidden relative">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] uppercase tracking-[0.2em] text-accent-foreground font-bold opacity-70 group-hover:opacity-100 transition-opacity">{report.title}</span>
                   <report.icon className="w-4 h-4 text-royal-gold" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-[var(--font-cinzel)] font-bold text-foreground mb-1">{report.value}</div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-emerald-600 font-bold px-1.5 py-0.5 bg-emerald-500/10 uppercase tracking-tighter">{report.trend}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{report.desc}</span>
                </div>
                {/* Decorative bar */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-royal-gold group-hover:w-full transition-all duration-700" />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardChart 
          title="Revenue Analytics"
          description="Revenue trends by month"
          icon={TrendingUp}
          data={revenueData}
          type="area"
          dataKey="amount"
          xAxisKey="name"
          prefix="$"
        />
        <DashboardChart 
          title="Occupancy Metrics"
          description="Stay volume trends across periods"
          icon={BarChart3}
          data={occupancyData}
          type="bar"
          dataKey="bookings"
          xAxisKey="name"
        />
      </div>

      {/* Historical Archive Generator */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="glass-panel p-12 border-royal-gold/10 flex flex-col items-center justify-center min-h-[300px] text-center space-y-6 shadow-sm dark:shadow-none bg-royal-gold/5 relative overflow-hidden"
      >
        <div className="h-20 w-20 border border-royal-gold/20 flex items-center justify-center rounded-full mb-4 bg-royal-gold/5 relative">
          <CalendarIcon className="h-8 w-8 text-royal-gold" />
          <div className="absolute -inset-2 bg-royal-gold/10 blur-xl rounded-full" />
        </div>
        <div>
           <h3 className="text-2xl font-[var(--font-cinzel)] font-bold text-foreground tracking-wide">Report Archives</h3>
           <p className="text-muted-foreground text-sm font-medium max-w-sm mx-auto mt-2 leading-relaxed">
             Select a specific period to generate a detailed report of all transactions, occupancy records, and guest patterns.
           </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-6">
           <button className="royal-button px-10">GENERATE ANNUAL ARCHIVE</button>
           <button className="h-12 px-8 border border-royal-gold/20 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-royal-gold/10 transition-all flex items-center gap-2">
             VIEW PAST REPORTS <ChevronRight className="w-4 h-4" />
           </button>
        </div>

        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-royal-gold/20" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-royal-gold/20" />
      </motion.div>
    </div>
  )
}
