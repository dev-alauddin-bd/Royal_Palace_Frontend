"use client"

import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi"
import { IBooking } from "@/types/booking.interface"
import Loader from "@/components/shared/Loader"
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader"
import { Clock, Search, Users, Scan, UserPlus, CheckCircle2, ShieldCheck, Bed } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function CheckInPage() {
  const { data: bookingsData, isLoading } = useGetAllBookingsQuery({ bookingStatus: 'CONFIRMED' })

  if (isLoading) return <Loader />

  const guests = (bookingsData?.data?.data || []).slice(0, 5)

  return (
    <div className="p-4 md:p-8 space-y-10">
      {/* ===== Header Section ===== */}
      <DashboardSectionHeader 
        title="Check-In"
        subtitle="Process guests who have arrived today."
        icon={Users}
        rightElement={
          <button className="royal-button !h-12 flex items-center gap-2 group">
            <Scan className="h-4 w-4 group-hover:rotate-90 transition-transform" />
            SCAN IDENTIFICATION
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Arrival List */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-8 border-royal-gold/10 shadow-sm dark:shadow-none">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-royal-gold" />
              <Input 
                className="h-12 bg-white/5 border-royal-gold/10 pl-12 text-foreground placeholder:text-muted-foreground/30 focus:border-royal-gold/50 transition-all rounded-none ring-0 focus-visible:ring-0" 
                placeholder="Find guest by name, email or reservation ID..." 
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-6">
                 <Clock className="w-3 h-3 text-royal-gold" />
                 <h3 className="text-[10px] uppercase tracking-[0.2em] text-accent-foreground font-bold">Awaiting Arrival (Confirmed)</h3>
              </div>
              
              {guests.length === 0 ? (
                <div className="p-10 text-center text-muted-foreground italic border border-dashed border-royal-gold/20">
                  No confirmed arrivals found in the royal registry for today.
                </div>
              ) : (
                guests.map((booking: IBooking, i: number) => (
                  <motion.div 
                    key={booking._id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border border-royal-gold/5 hover:border-royal-gold/30 transition-all group bg-royal-gold/5 last:mb-0"
                  >
                    <div className="flex items-center gap-5 mb-4 sm:mb-0">
                      <div className="h-12 w-12 bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center group-hover:bg-royal-gold/20 transition-colors">
                        <UserPlus className="h-5 w-5 text-royal-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground group-hover:text-royal-gold transition-colors">{booking.userId?.name || 'Walk-in Guest'}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mt-1">{booking.rooms?.[0]?.roomId?.title || 'Heritage Suite'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <p className="text-[10px] text-royal-gold font-bold mb-1 tracking-tighter">ID: {booking.transactionId?.slice(-8).toUpperCase()}</p>
                        <span className={`text-[8px] uppercase tracking-widest font-bold px-2 py-0.5 text-emerald-600 bg-emerald-500/10`}>
                          READY
                        </span>
                      </div>
                      <button className="text-[10px] uppercase tracking-widest text-foreground hover:text-royal-gold font-bold h-10 px-6 border border-royal-gold/20 hover:border-royal-gold transition-all bg-card">
                        Check-In
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Metrics & Help */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="glass-panel border-royal-gold/20 shadow-sm dark:shadow-none p-0">
            <CardContent className="p-8 text-center space-y-6">
              <div className="h-14 w-14 bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center rounded-full mx-auto">
                <CheckCircle2 className="h-6 w-6 text-royal-gold" />
              </div>
              <div>
                 <h3 className="text-lg font-[var(--font-cinzel)] font-bold text-foreground">Arrival Summary</h3>
                 <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">Today's Performance</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-royal-gold/5 border border-royal-gold/10">
                  <p className="text-3xl font-[var(--font-cinzel)] text-foreground">12</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Expected</p>
                </div>
                <div className="p-4 bg-royal-gold/5 border border-royal-gold/10">
                  <p className="text-3xl font-[var(--font-cinzel)] text-emerald-600">8</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Arrived</p>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                 <div className="flex items-center gap-3 p-3 bg-white/5 border border-royal-gold/5 text-left group hover:border-royal-gold/20 transition-all cursor-pointer">
                    <ShieldCheck className="w-4 h-4 text-royal-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/80 group-hover:text-foreground">Verify ID Documents</span>
                 </div>
                 <div className="flex items-center gap-3 p-3 bg-white/5 border border-royal-gold/5 text-left group hover:border-royal-gold/20 transition-all cursor-pointer">
                    <Bed className="w-4 h-4 text-royal-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/80 group-hover:text-foreground">Assign Smart Key</span>
                 </div>
              </div>

              <p className="text-[10px] text-muted-foreground font-medium leading-relaxed uppercase tracking-tighter pt-4">
                System synchronized with Housekeeping.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
