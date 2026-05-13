// ====================================================
// 🧭 DashboardHeader Component
// ====================================================

'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLogout } from '@/hooks/useLogout';
import { DropdownMenuInNav } from '../shared/dropdown-menu';

export function DashboardHeader() {
  // ========== 🌗 Theme Setup ========== //
  const { theme, setTheme } = useTheme();
  const logout = useLogout();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };





  // ========== 🧩 Render Header ========== //
  return (
    <header className="sticky top-0 z-40 border-b border-royal-gold/10 bg-royal-obsidian/80 backdrop-blur-xl">
      <div className="flex h-16 justify-between items-center gap-4 px-6">
        {/* ===== 🔹 Sidebar Toggle Button ===== */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-royal-gold hover:bg-royal-gold/10 rounded-none transition-colors" />
          <div className="h-4 w-px bg-royal-gold/20 hidden sm:block" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40 hidden sm:block">
            Palace Management System
          </span>
        </div>

        {/* ===== 🔹 Right Controls ===== */}
        <div className="flex items-center space-x-6">
          <button className="text-foreground/60 hover:text-royal-gold transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-royal-gold rounded-full" />
          </button>
        
          {/* ===== 🌙 Theme Toggle Button ===== */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 border border-royal-gold/10 hover:border-royal-gold/40 text-foreground/60 hover:text-royal-gold transition-all cursor-pointer bg-white/5"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <div className="h-4 w-px bg-royal-gold/20" />

          {/* ===== 👤 User Profile Dropdown ===== */}
          <DropdownMenuInNav onClick={logout} />
        </div>
      </div>
    </header>
  );
}
