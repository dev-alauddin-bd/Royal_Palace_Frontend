"use client"

import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi"
import { IBooking } from "@/types/booking.interface"
import Loader from "@/components/shared/Loader"
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader"
import { Calendar, Search, Filter, Plus, Clock, Bed, User, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

export default function ReservationsPage() {
  const { data: bookingsData, isLoading } = useGetAllBookingsQuery(undefined)

  if (isLoading) return <Loader />

  const reservations = (bookingsData?.data?.data || [])

  return (
    <div className="p-4 md:p-8 space-y-10 min-h-screen">
      {/* ===== Header Section ===== */}
      <DashboardSectionHeader 
        title="Reservations"
        subtitle="View and track all upcoming and past stay records."
        icon={Calendar}
        rightElement={
          <button className="royal-button !h-12 flex items-center gap-2 group">
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
            NEW RESERVATION
          </button>
        }
      />

      {/* ===== Search & Filter Bar ===== */}
      <div className="glass-panel p-6 border-royal-gold/10 flex flex-col md:flex-row gap-4 items-center shadow-sm dark:shadow-none">
        <div className="relative w-full flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-royal-gold" />
          <Input 
            className="h-12 bg-white/5 border-royal-gold/10 pl-12 text-foreground placeholder:text-muted-foreground/30 focus:border-royal-gold/50 transition-all rounded-none ring-0 focus-visible:ring-0" 
            placeholder="Search by reservation ID, guest name or email..." 
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
           <button className="h-12 px-6 border border-royal-gold/10 text-[10px] uppercase tracking-widest text-muted-foreground hover:text-royal-gold hover:border-royal-gold transition-all font-bold flex items-center gap-2 bg-royal-gold/5">
              <Filter className="h-4 w-4" /> Filter
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reservations.length === 0 ? (
           <div className="p-20 text-center text-muted-foreground italic glass-panel border-royal-gold/10">
              No reservation records found in the royal ledger.
           </div>
        ) : (
          reservations.map((res: IBooking, i: number) => (
            <motion.div 
              key={res._id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 border-royal-gold/5 hover:border-royal-gold/30 transition-all group bg-royal-gold/5"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex items-center gap-6">
                  <div className="h-14 w-14 bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center group-hover:bg-royal-gold/20 transition-colors">
                    <User className="h-6 w-6 text-royal-gold" />
                  </div>
                  <div>
                     <div className="flex items-center gap-3">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-royal-gold transition-colors">{res.userId?.name || 'Walk-in Guest'}</h3>
                        <Badge variant="outline" className="text-[8px] uppercase tracking-widest border-royal-gold/10 text-royal-gold">ID: {res.transactionId?.slice(-8).toUpperCase()}</Badge>
                     </div>
                     <p className="text-xs text-muted-foreground font-medium mt-1 flex items-center gap-2">
                        <Bed className="w-3 h-3 text-royal-gold/60" /> {res.rooms?.[0]?.roomId?.title || 'Heritage Suite'}
                     </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-8 w-full md:w-auto">
                   <div className="space-y-1">
                      <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold flex items-center gap-1">
                         <Clock className="w-2.5 h-2.5 text-royal-gold" /> Stay Period
                      </p>
                      <p className="text-xs font-medium text-foreground">
                        {new Date(res.rooms[0].checkInDate).toLocaleDateString()} - {new Date(res.rooms[0].checkOutDate).toLocaleDateString()}
                      </p>
                   </div>
                   
                   <div className="space-y-1">
                      <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">Investment</p>
                      <p className="text-sm font-[var(--font-cinzel)] font-bold text-foreground">${res.totalAmount.toLocaleString()}</p>
                   </div>

                   <div className="space-y-1 text-center">
                      <p className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">Status</p>
                      <Badge variant="outline" className={`text-[9px] uppercase tracking-widest px-2 py-0.5 border-royal-gold/20 text-royal-gold bg-royal-gold/5 ${['confirmed', 'booked'].includes(res.bookingStatus.toLowerCase()) ? 'border-emerald-500/20 text-emerald-600 bg-emerald-500/5' : ''}`}>
                         {res.bookingStatus}
                      </Badge>
                   </div>

                   <button className="h-10 px-6 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest hover:bg-royal-gold hover:text-black transition-all flex items-center gap-2 ml-auto md:ml-0">
                      Process <ArrowRight className="w-3 h-3" />
                   </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
