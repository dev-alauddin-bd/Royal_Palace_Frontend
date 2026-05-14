"use client"

import React, { useState } from "react"
import { 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  X, 
  Calendar, 
  Filter, 
  Plus, 
  User, 
  Bed, 
  Clock, 
  MoreHorizontal,
  ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGetAllBookingsQuery } from "@/redux/features/booking/bookingApi"
import { IBooking } from "@/types/booking.interface"
import Loader from "@/components/shared/Loader"
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader"
import { motion, AnimatePresence } from "framer-motion"

export default function ReceptionistBookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null)

  const { data: bookingData, isLoading: bookingLoading } = useGetAllBookingsQuery({
    searchTerm,
    status: statusFilter === "all" ? undefined : statusFilter,
  })

  const bookings = (bookingData?.data?.data || [])

  const getStatusColor = (status: string) => {
    const s = status.toLowerCase()
    if (["booked", "confirmed"].includes(s)) return "border-emerald-500/20 text-emerald-600 bg-emerald-500/5"
    if (s === "pending") return "border-amber-500/20 text-amber-600 bg-amber-500/5"
    return "border-rose-500/20 text-rose-500 bg-rose-500/5"
  }

  return (
    <div className="p-4 md:p-8 space-y-10 min-h-screen">
      {/* ===== Header Section ===== */}
      <DashboardSectionHeader 
        title="Manage Bookings"
        subtitle="Edit or update booking information in the registry."
        icon={Calendar}
        rightElement={
          <button className="royal-button !h-12 flex items-center gap-2 group">
            <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
            CREATE BOOKING
          </button>
        }
      />

      {/* ===== Search & Filter Bar ===== */}
      <div className="glass-panel p-6 border-royal-gold/10 flex flex-col md:flex-row gap-4 items-center shadow-sm dark:shadow-none">
        <div className="relative w-full flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-royal-gold" />
          <Input
            placeholder="Search the registry by name, email or transaction ID..."
            className="h-12 bg-white/5 border-royal-gold/10 pl-12 text-foreground placeholder:text-muted-foreground/30 focus:border-royal-gold/50 transition-all rounded-none ring-0 focus-visible:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select onValueChange={setStatusFilter} defaultValue="all">
          <SelectTrigger className="w-full md:w-56 h-12 bg-white/5 border-royal-gold/10 text-foreground rounded-none focus:ring-0">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-card border-royal-gold/20 rounded-none">
            <SelectItem value="all">Every State</SelectItem>
            <SelectItem value="booked">Confirmed Stay</SelectItem>
            <SelectItem value="pending">Awaiting Review</SelectItem>
            <SelectItem value="cancelled">Rescinded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ===== Ledger Table ===== */}
      <Card className="glass-panel border-royal-gold/10 overflow-hidden shadow-sm dark:shadow-none bg-transparent border-0">
        <CardContent className="p-0">
          {bookingLoading ? (
            <div className="p-20 text-center"><Loader /></div>
          ) : bookings.length === 0 ? (
            <div className="p-20 text-center text-muted-foreground italic border border-dashed border-royal-gold/20 bg-royal-gold/5">
              The registry holds no records for the current selection.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full border-collapse">
                <TableHeader>
                  <TableRow className="bg-royal-gold/5 border-b border-royal-gold/10">
                    <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5">Patron</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5">Suite Assignment</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5">Stay Period</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-right">Investment</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-center">Status</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking: IBooking, i: number) => (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-royal-gold/5 hover:bg-royal-gold/5 transition-colors group"
                    >
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 bg-royal-gold/10 border border-royal-gold/20 flex items-center justify-center group-hover:bg-royal-gold/20 transition-colors">
                            <User className="h-4 w-4 text-royal-gold" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-foreground group-hover:text-royal-gold transition-colors">{booking.userId?.name || 'Walk-in Guest'}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{booking.userId?.email || 'N/A'}</p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="px-8 py-5">
                         <div className="flex flex-col gap-1">
                            <p className="text-xs font-medium text-foreground flex items-center gap-2">
                               <Bed className="w-3 h-3 text-royal-gold" /> {booking.rooms?.[0]?.roomId?.title || 'Heritage Suite'}
                            </p>
                            {booking.rooms.length > 1 && (
                               <Badge variant="outline" className="w-fit text-[8px] uppercase tracking-tighter border-royal-gold/10 text-muted-foreground">
                                  + {booking.rooms.length - 1} More Units
                               </Badge>
                            )}
                         </div>
                      </TableCell>

                      <TableCell className="px-8 py-5">
                         <div className="flex flex-col gap-1">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-1">
                               <Clock className="w-2.5 h-2.5 text-royal-gold" /> Stay Cycle
                            </p>
                            <p className="text-xs font-medium text-foreground">
                               {new Date(booking.rooms[0]?.checkInDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(booking.rooms[0]?.checkOutDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                         </div>
                      </TableCell>

                      <TableCell className="px-8 py-5 text-right">
                         <p className="text-sm font-[var(--font-cinzel)] font-bold text-foreground group-hover:text-royal-gold transition-colors">
                            ${booking.totalAmount.toLocaleString()}
                         </p>
                      </TableCell>

                      <TableCell className="px-8 py-5 text-center">
                        <Badge 
                          variant="outline" 
                          className={`text-[9px] uppercase tracking-widest px-2 py-0.5 ${getStatusColor(booking.bookingStatus)}`}
                        >
                          {booking.bookingStatus}
                        </Badge>
                      </TableCell>

                      <TableCell className="px-8 py-5 text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-royal-gold hover:bg-royal-gold/10 rounded-none">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-card border-royal-gold/20 rounded-none w-48 p-2">
                            <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground">Sovereign Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-royal-gold/10" />
                            <DropdownMenuItem className="text-xs font-medium cursor-pointer hover:bg-royal-gold/10 focus:bg-royal-gold/10 rounded-none py-2 px-3 flex items-center gap-3">
                              <Eye className="h-3.5 w-3.5 text-royal-gold" /> View Dossier
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-medium cursor-pointer hover:bg-royal-gold/10 focus:bg-royal-gold/10 rounded-none py-2 px-3 flex items-center gap-3">
                              <Edit className="h-3.5 w-3.5 text-royal-gold" /> Update Terms
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-royal-gold/10" />
                            <DropdownMenuItem className="text-xs font-medium cursor-pointer text-rose-500 hover:bg-rose-500/10 focus:bg-rose-500/10 rounded-none py-2 px-3 flex items-center gap-3">
                              <Trash2 className="h-3.5 w-3.5" /> Void Registry
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ===== Informational Footer ===== */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-royal-gold/10 text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60">
         <p>Secure Registry Protocol Active</p>
         <div className="flex items-center gap-6 mt-4 md:mt-0">
            <span className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Operational</span>
            <span className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-royal-gold" /> Encrypted</span>
         </div>
      </div>
    </div>
  )
}
