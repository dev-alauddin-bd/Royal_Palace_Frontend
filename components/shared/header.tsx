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

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'Faq', href: '/faq' },
    { name: 'Checkout', href: '/checkout' },
    { name: 'Cart', href: '/cart' },
  ];

  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };



  return (
    <header className="bg-main sticky top-0 z-50 shadow-lg border-b">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Crown className="h-5 w-5 title mr-2" />
            <span className="font-bold title text-sm lg:text-base hidden md:block">
              ROYAL PALACE
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:hidden lg:flex space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${pathname === item.href
                  ? 'title'
                  : 'text-foreground hover:title'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">

            {/* signup and login button */}

            {
              user ? <Button onClick={logout} className=" bg-[#bf9310] hover:bg-yellow-600 text-black">
                Logout
              </Button> : <>

                <Button className=" bg-[#bf9310] hover:bg-yellow-600 text-black hidden md:block">
                  <Link href="/signup" className="text-sm font-medium">
                    Sign Up
                  </Link>
                </Button>
                <Button className=" bg-[#bf9310] cursor-pointer hover:bg-yellow-600 hidden md:block text-black">
                  <Link href="/login" className="text-sm font-medium">
                    Login
                  </Link>
                </Button>
              </>
            }


            {/* Theme toggle */}
            <Button
              onClick={toggleTheme}
              variant={theme === 'dark' ? 'outline' : 'ghost'}

              className="p-2 rounded border hover:title hover:text-foreground transition cursor-pointer hidden md:block"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>

            {/* User dropdown */}
            <DropdownMenuInNav onClick={logout} />

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden p-2 rounded cursor-pointer
    focus:outline-none focus:ring-0
    border-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="w-6 h-6 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed md:hidden inset-y-0 left-0 w-64 bg-background shadow-lg z-50 px-6 py-6 space-y-4 border-r border-gray-200 dark:border-gray-700"
          >
            {/* Nav Items */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block  font-medium transition-all duration-200 py-2 px-3  border ${pathname === item.href
                  ? 'bg-[#bf9310] text-foreground'
                  : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-l-4 hover:border-title'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
