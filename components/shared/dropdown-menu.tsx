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
          <div className="flex items-center gap-2 cursor-pointer border border-[#bf9310] rounded-full">
            <Avatar>
              <AvatarImage src={user?.image} alt="userImage" />
              <AvatarFallback>AV</AvatarFallback>
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
