'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crown, Sun, Moon, } from 'lucide-react';
import { DropdownMenuInNav } from './dropdown-menu';
import { useTheme } from 'next-themes';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { motion, AnimatePresence } from 'framer-motion';
import { useLogout } from '@/hooks/useLogout';
import { Button } from '../ui/button';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const logout = useLogout();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Faq', href: '/faq' },
    { name: 'Checkout', href: '/checkout' },
    { name: 'Cart', href: '/cart' },
  ];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const dashboardPath = user?.role === 'admin' 
    ? '/dashboard/admin' 
    : user?.role === 'receptionist' 
      ? '/dashboard/receptionist' 
      : '/dashboard/user';

  const authNavigation = user 
    ? [...navigation, { name: 'Dashboard', href: dashboardPath }] 
    : navigation;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-royal-gold/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <Crown className="h-7 w-7 text-royal-gold transition-transform group-hover:rotate-12" />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-[0.2em] uppercase text-foreground leading-none">Royal Palace</span>
                <span className="text-[8px] tracking-[0.4em] uppercase text-royal-gold font-bold">Luxury Hotel & Resort</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10 text-[11px] font-bold uppercase tracking-[0.25em]">
            {authNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-all hover:text-royal-gold relative py-2 group ${
                  pathname === item.href ? 'text-royal-gold' : 'text-foreground/70'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-royal-gold transition-all duration-300 ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <Button 
                  variant="outline" 
                  onClick={logout} 
                  className="border-royal-gold/30 text-royal-gold hover:bg-royal-gold hover:text-royal-blue text-[10px] tracking-[0.2em] font-bold uppercase rounded-none h-10 px-6 transition-all"
                >
                  Logout
                </Button>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login">
                    <Button 
                      variant="outline" 
                      className="border-royal-gold/30 text-royal-gold hover:bg-royal-gold hover:text-royal-blue text-[10px] tracking-[0.2em] font-bold uppercase rounded-none h-10 px-6 transition-all"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button 
                      className="bg-royal-gold text-royal-blue text-[10px] tracking-[0.2em] font-bold uppercase rounded-none h-10 px-6 hover:bg-royal-gold/90 transition-all shadow-[0_0_15px_rgba(197,160,33,0.2)]"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex rounded-none"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <DropdownMenuInNav onClick={logout} />

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden text-royal-gold"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-royal-gold/10 bg-background"
          >
            <div className="space-y-4 px-6 pb-8 pt-4">
              {authNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-sm font-bold uppercase tracking-[0.2em] text-foreground/70 hover:text-royal-gold py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-royal-gold/10 flex flex-col gap-4">
                {!user && (
                  <>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-royal-gold text-royal-gold uppercase tracking-widest text-[10px] rounded-none">Login</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-royal-gold text-royal-blue uppercase tracking-widest text-[10px] rounded-none">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
