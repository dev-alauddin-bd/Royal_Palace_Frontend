"use client"

import { BarChart3, Download, Filter, Calendar as CalendarIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ReportsPage() {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-royal-gold">
            <BarChart3 className="h-5 w-5" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Financial Intelligence</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Archives & Reports</h1>
          <p className="text-white/40 text-sm font-light max-w-md">Detailed financial statements and operational metrics for the sovereign domain.</p>
        </div>
        <div className="flex gap-3">
          <button className="glass-panel px-6 h-12 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/60 hover:text-royal-gold transition-all">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="royal-button-solid h-12 flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Occupancy Revenue", value: "$45,200", trend: "+12.5%", desc: "Monthly yield" },
          { title: "Service Revenue", value: "$12,800", trend: "+8.2%", desc: "Dining & Spa" },
          { title: "Net Sovereign Gain", value: "$32,400", trend: "+15.0%", desc: "After maintenance" }
        ].map((report, i) => (
          <Card key={i} className="glass-panel border-white/5">
            <CardHeader className="pb-2">
              <span className="text-[10px] uppercase tracking-widest text-royal-gold/60 font-bold">{report.title}</span>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-serif font-bold text-white mb-1">{report.value}</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-green-500 font-bold">{report.trend}</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">{report.desc}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="glass-panel p-8 border-white/5 flex flex-col items-center justify-center min-h-[300px] text-center space-y-4">
        <div className="h-16 w-16 border border-royal-gold/20 flex items-center justify-center rounded-full mb-2">
          <CalendarIcon className="h-8 w-8 text-royal-gold/30" />
        </div>
        <h3 className="text-xl font-serif text-white tracking-wide">Historical Registry Archives</h3>
        <p className="text-white/40 text-sm font-light max-w-sm mx-auto">Select a period to generate a detailed sovereign report of all transactions and occupancy records.</p>
        <button className="royal-button mt-4">Generate Annual Archive</button>
      </div>
    </div>
  )
}
