// ====================================================
// 🧾 DropdownMenuInNav Component - User avatar dropdown with dashboard & logout
// ====================================================

import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import Link from 'next/link';

export function DropdownMenuInNav({ onClick }: { onClick?: () => void }) {
  // ===== Get user from Redux store =====
  const user = useSelector(selectCurrentUser);

  const currentRole = user?.role;

  // ===== Map user role to dashboard route =====
  const dashboardRoute = (() => {
    switch (currentRole) {
      case 'admin':
        return '/dashboard/admin';
      case 'receptionist':
        return '/dashboard/receptionist';
      case 'guest':
        return '/dashboard/user';
      default:
        return '/login';
    }
  })();

  // ===== Render Dropdown Menu =====
  return (
    <DropdownMenu>
      {user && (
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer border border-royal-gold/40 rounded-full hover:border-royal-gold transition-colors duration-300 p-0.5">
            <Avatar className="w-8 h-8 md:w-10 md:h-10">
              <AvatarImage src={user?.image} alt="userImage" />
              <AvatarFallback className="bg-royal-gold text-royal-obsidian font-bold">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
      )}

      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        <DropdownMenuGroup>
          <Link href={dashboardRoute} passHref>
            <DropdownMenuItem>
              Dashboard
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={onClick}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
