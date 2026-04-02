// ====================================================
// 🧭 DashboardHeader Component
// ====================================================

'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function DashboardHeader() {
  // ========== 🌗 Theme Setup ========== //
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };





  // ========== 🧩 Render Header ========== //
  return (
    <header className="sticky top-0 z-40 border-b bg-sidebar">
      <div className="flex h-16 justify-between items-center gap-4 px-6">
        {/* ===== 🔹 Sidebar Toggle Button ===== */}
        <SidebarTrigger className="text-foreground hover:text-white" />

        {/* ===== 🔹 Right Controls ===== */}
        <div className="flex items-center space-x-4 relative">
        

       
          {/* ===== 🌙 Theme Toggle Button ===== */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded hover:title hover:text-foreground transition cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
