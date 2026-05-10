"use client"

import { Settings, Shield, Globe, Bell, Save } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-royal-gold">
            <Settings className="h-5 w-5" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Domain Configuration</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">System Settings</h1>
          <p className="text-white/40 text-sm font-light max-w-md">Configure the underlying protocols and branding of the Royal Palace domain.</p>
        </div>
        <button className="royal-button-solid h-12 flex items-center gap-2">
          <Save className="h-4 w-4" />
          Synchronize Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-8 border-white/5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-serif text-white flex items-center gap-3">
                <Globe className="h-5 w-5 text-royal-gold" />
                Global Identity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="royal-label">Domain Title</Label>
                  <Input defaultValue="Royal Palace Sovereign" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="space-y-2">
                  <Label className="royal-label">Contact Registry</Label>
                  <Input defaultValue="contact@royalpalace.com" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/5" />

            <div className="space-y-6">
              <h3 className="text-lg font-serif text-white flex items-center gap-3">
                <Shield className="h-5 w-5 text-royal-gold" />
                Security Protocols
              </h3>
              {[
                { title: "Two-Factor Authentication", desc: "Mandatory for all administrative access", active: true },
                { title: "Login Session Logs", desc: "Keep record of all access attempts", active: true },
                { title: "Maintenance Mode", desc: "Restrict public access to the domain", active: false }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5">
                  <div>
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="text-xs text-white/40 font-light">{item.desc}</p>
                  </div>
                  <Switch checked={item.active} className="data-[state=checked]:bg-royal-gold" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-8 border-white/5 space-y-4">
            <h3 className="text-lg font-serif text-white flex items-center gap-3">
              <Bell className="h-5 w-5 text-royal-gold" />
              Intelligence Alerts
            </h3>
            <p className="text-white/40 text-xs font-light leading-relaxed">Configure how the system notifies administrators of critical events and new registrations.</p>
            <div className="pt-4 space-y-4">
               <button className="w-full h-12 border border-royal-gold/30 text-[10px] uppercase tracking-widest text-royal-gold font-bold hover:bg-royal-gold hover:text-royal-blue transition-all">Configure Notifications</button>
               <button className="w-full h-12 text-[10px] uppercase tracking-widest text-white/40 font-bold hover:text-white transition-all">Reset to Defaults</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
