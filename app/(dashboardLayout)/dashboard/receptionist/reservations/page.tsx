"use client"

import { Calendar, BookOpen, Plus, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ReservationsPage() {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-royal-gold">
            <BookOpen className="h-5 w-5" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Registry Services</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Manual Reservations</h1>
          <p className="text-white/40 text-sm font-light max-w-md">Establish new stay records for walk-in guests or via telecommunication requests.</p>
        </div>
        <button className="royal-button-solid h-12 flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Reservation
        </button>
      </div>

      <div className="glass-panel p-8 border-white/5 space-y-8">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
            <Input className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-white/20" placeholder="Search reservations..." />
          </div>
          <div className="flex items-center gap-3">
             <button className="h-10 px-6 border border-white/10 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-all">Today</button>
             <button className="h-10 px-6 border border-white/10 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-all">Upcoming</button>
             <button className="h-10 px-6 border border-royal-gold/30 text-[10px] uppercase tracking-widest text-royal-gold font-bold">Month View</button>
          </div>
        </div>

        <div className="border border-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-royal-gold font-bold">Guest Details</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-royal-gold font-bold">Stay Period</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-royal-gold font-bold">Accommodation</th>
                <th className="px-6 py-4 text-[10px] uppercase tracking-widest text-royal-gold font-bold text-right">Registry Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: "Robert Fox", stay: "Oct 12 - Oct 15", room: "Suite 404", status: "Confirmed" },
                { name: "Esther Howard", stay: "Oct 15 - Oct 20", room: "Deluxe 202", status: "Pending" },
                { name: "Jenny Wilson", stay: "Oct 22 - Oct 25", room: "Studio 301", status: "Confirmed" }
              ].map((res, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white group-hover:text-royal-gold transition-colors">{res.name}</span>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest">Manual Entry</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white/60 font-serif">{res.stay}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white/60">{res.room}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className={`text-[10px] uppercase tracking-widest font-bold px-3 py-1 border ${res.status === 'Confirmed' ? 'border-green-500/20 text-green-500' : 'border-amber-500/20 text-amber-500'}`}>{res.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
