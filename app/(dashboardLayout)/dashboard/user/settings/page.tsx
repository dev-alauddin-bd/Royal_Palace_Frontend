"use client"

import { User, Settings, Shield, Bell, Save, Camera } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export default function UserSettingsPage() {
  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-royal-gold">
            <User className="h-5 w-5" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Patron Preferences</span>
          </div>
          <h1 className="text-4xl font-serif font-bold text-white tracking-tight">Account Identity</h1>
          <p className="text-white/40 text-sm font-light max-w-md">Manage your personal credentials and communication preferences for your stay.</p>
        </div>
        <button className="royal-button-solid h-12 flex items-center gap-2">
          <Save className="h-4 w-4" />
          Update Identity
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-panel p-8 border-white/5 space-y-8">
            {/* Profile Picture */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group">
                <div className="h-24 w-24 border border-royal-gold/20 flex items-center justify-center bg-white/5 overflow-hidden">
                  <User className="h-10 w-10 text-royal-gold/20" />
                </div>
                <button className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="h-6 w-6 text-royal-gold" />
                </button>
              </div>
              <div className="text-center md:text-left space-y-1">
                <h3 className="text-lg font-serif text-white">Digital Portrait</h3>
                <p className="text-white/40 text-xs font-light">Recommended size: 400x400px. Maximum 2MB.</p>
                <div className="pt-2">
                  <button className="text-[10px] text-royal-gold uppercase tracking-widest font-bold hover:text-white transition-colors">Replace Portrait</button>
                </div>
              </div>
            </div>

            <div className="h-[1px] w-full bg-white/5" />

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="royal-label">Sovereign Name</Label>
                <Input defaultValue="Alex Johnson" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="royal-label">Email Registry</Label>
                <Input defaultValue="alex@example.com" disabled className="bg-white/5 border-white/10 text-white/40" />
              </div>
              <div className="space-y-2">
                <Label className="royal-label">Contact Number</Label>
                <Input defaultValue="+1 (555) 000-0000" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="royal-label">Default Language</Label>
                <Input defaultValue="English (UK)" className="bg-white/5 border-white/10 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-8 border-white/5 space-y-6">
            <h3 className="text-lg font-serif text-white flex items-center gap-3">
              <Shield className="h-5 w-5 text-royal-gold" />
              Security
            </h3>
            <div className="space-y-4">
               <button className="w-full h-12 border border-white/10 text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-all">Change Secret Key</button>
               <div className="flex items-center justify-between p-3 bg-white/5">
                 <span className="text-xs text-white/60">Biometric Login</span>
                 <Switch className="data-[state=checked]:bg-royal-gold" />
               </div>
            </div>
          </div>

          <div className="glass-panel p-8 border-white/5 space-y-4">
            <h3 className="text-lg font-serif text-white flex items-center gap-3">
              <Bell className="h-5 w-5 text-royal-gold" />
              Alerts
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">Email Protocol</span>
                <Switch checked className="data-[state=checked]:bg-royal-gold scale-75" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/40">SMS Protocol</span>
                <Switch className="data-[state=checked]:bg-royal-gold scale-75" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
