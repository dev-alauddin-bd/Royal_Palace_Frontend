'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Bell, Moon, Sun, Search } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLogout } from '@/hooks/useLogout';
import { DropdownMenuInNav } from '../shared/dropdown-menu';
import { motion } from 'framer-motion';

export function DashboardHeader() {
  const { theme, setTheme } = useTheme();
  const logout = useLogout();
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-royal-gold/10 bg-background/80 backdrop-blur-xl shadow-sm dark:shadow-none">
      <div className="flex h-16 justify-between items-center gap-4 px-6">
        {/* ===== 🔹 Left: Sidebar Toggle & Context ===== */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-royal-gold hover:bg-royal-gold/10 rounded-none transition-colors" />
          <div className="h-6 w-[1px] bg-royal-gold/20 hidden sm:block" />
          <div className="hidden lg:flex items-center gap-3 bg-royal-gold/5 px-4 py-1.5 border border-royal-gold/10">
             <Search className="w-3 h-3 text-royal-gold" />
             <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/60">
               Quick Search...
             </span>
          </div>
        </div>

        {/* ===== 🔹 Right: Utility Controls ===== */}
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="flex items-center gap-4 md:gap-6">
            <button className="text-muted-foreground hover:text-royal-gold transition-colors relative group">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-royal-gold rounded-full border-2 border-background animate-pulse" />
            </button>
          
            {/* ===== 🌙 Theme Toggle ===== */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 border border-royal-gold/10 hover:border-royal-gold/40 text-muted-foreground hover:text-royal-gold transition-all cursor-pointer bg-royal-gold/5"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </motion.button>
          </div>

          <div className="h-6 w-[1px] bg-royal-gold/20" />

          {/* ===== 👤 User Profile ===== */}
          <div className="flex items-center gap-3">
             <div className="hidden md:block text-right">
                <p className="text-[10px] font-bold text-foreground uppercase tracking-widest">Royal Palace</p>
                <p className="text-[8px] font-medium text-royal-gold uppercase tracking-[0.2em]">Authorized Access</p>
             </div>
             <DropdownMenuInNav onClick={logout} />
          </div>
        </div>
      </div>
    </header>
  );
}
