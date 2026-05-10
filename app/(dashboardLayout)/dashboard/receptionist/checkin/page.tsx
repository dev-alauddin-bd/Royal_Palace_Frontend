"use client"

import { Users, Scan, CheckCircle2, UserPlus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function CheckInPage() {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-royal-gold">
            <Users className="h-5 w-5" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Concierge Desk</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Guest Check-In</h1>
          <p className="text-white/40 text-sm font-light max-w-md">Process arriving guests and activate their digital access to the palace.</p>
        </div>
        <button className="royal-button-solid h-12 flex items-center gap-2">
          <Scan className="h-4 w-4" />
          Scan Identification
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input className="bg-white/5 border-white/10 pl-10 text-white placeholder:text-white/20" placeholder="Find guest by name, email or reservation ID..." />
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] uppercase tracking-widest text-royal-gold font-bold mb-4">Awaiting Arrival (Today)</h3>
              {[
                { name: "John Doe", room: "102 - Executive Suite", time: "14:00", id: "RES-9921" },
                { name: "Sarah Williams", room: "305 - Deluxe Ocean", time: "15:30", id: "RES-8812" },
                { name: "Michael Chen", room: "P-01 - Penthouse", time: "16:15", id: "RES-7721" }
              ].map((guest, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 hover:border-royal-gold/30 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 border border-royal-gold/20 flex items-center justify-center">
                      <UserPlus className="h-5 w-5 text-royal-gold/40 group-hover:text-royal-gold transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{guest.name}</p>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest">{guest.room}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-royal-gold font-bold mb-1">ID: {guest.id}</p>
                    <button className="text-[10px] uppercase tracking-widest text-white/60 hover:text-white font-bold h-8 px-4 border border-white/10 hover:border-royal-gold transition-all">Process Check-In</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="glass-panel border-white/5">
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-12 w-12 bg-royal-gold/10 flex items-center justify-center rounded-full mx-auto">
                <CheckCircle2 className="h-6 w-6 text-royal-gold" />
              </div>
              <h3 className="text-lg font-serif text-white">Daily Summary</h3>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 bg-white/5 border border-white/5">
                  <p className="text-2xl font-serif text-white">12</p>
                  <p className="text-[9px] uppercase tracking-widest text-white/40">Expected</p>
                </div>
                <div className="p-3 bg-white/5 border border-white/5">
                  <p className="text-2xl font-serif text-white">8</p>
                  <p className="text-[9px] uppercase tracking-widest text-white/40">Checked In</p>
                </div>
              </div>
              <p className="text-[10px] text-white/40 font-light leading-relaxed">System automatically synchronizes with Housekeeping to ensure room readiness before check-in.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
