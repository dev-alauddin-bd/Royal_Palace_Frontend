'use client';

import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail,
} from '../ui/sidebar';
import Link from 'next/link';
import {
  Bed,
  Building,
  Calendar,
  CreditCard,
  Crown,
  User,
  Users,
  BarChart3,
  Settings,
} from 'lucide-react';
import RoleBasedSidebarMenu from './RoleBasedSidebarMenu';

// ✅ Shared menu items (added once)
const sharedItems = [
  {
    title: 'Profile',
    url: '/dashboard/common/profile',
    icon: User,
    roles: ['admin', 'receptionist', 'guest'],
  },
];

// ✅ Role-specific menu items
const adminMenuItems = [
  { title: 'Overview', url: '/dashboard/admin', icon: Crown },
  { title: 'Manage Users', url: '/dashboard/admin/users', icon: Users },
  { title: 'Manage Rooms', url: '/dashboard/admin/rooms', icon: Bed },
  { title: 'Manage Team', url: '/dashboard/admin/teams', icon: Building },
  { title: 'Manage Bookings', url: '/dashboard/admin/bookings', icon: Calendar },
  { title: 'Manage Payments', url: '/dashboard/admin/payments', icon: CreditCard },
  { title: 'Reports', url: '/dashboard/admin/reports', icon: BarChart3 },
  { title: 'Settings', url: '/dashboard/admin/settings', icon: Settings },
];

const receptionistMenuItems = [
  { title: 'Dashboard', url: '/dashboard/receptionist', icon: Crown },
  {
    title: 'Payments Management',
    url: '/dashboard/receptionist/payments',
    icon: CreditCard,
  },
  {
    title: 'Bookings Management',
    url: '/dashboard/receptionist/bookings',
    icon: Calendar,
  },
  { title: 'Check-In', url: '/dashboard/receptionist/checkin', icon: Users },
  {
    title: 'Reservations',
    url: '/dashboard/receptionist/reservations',
    icon: Calendar,
  },
];

const guestMenuItems = [
  { title: 'Overview', url: '/dashboard/user', icon: Crown },
  { title: 'My Bookings', url: '/dashboard/user/bookings', icon: Bed },
  { title: 'Payments', url: '/dashboard/user/payments', icon: CreditCard },
  { title: 'Settings', url: '/dashboard/user/settings', icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const user = useSelector(selectCurrentUser);
  const currentRole = user?.role?.toLowerCase() || 'guest';

  let roleBasedItems = [];

  if (currentRole === 'admin') {
    roleBasedItems = adminMenuItems;
  } else if (currentRole === 'receptionist') {
    roleBasedItems = receptionistMenuItems;
  } else {
    roleBasedItems = guestMenuItems;
  }

  // ✅ Combine role-based items with shared items (only once)
  const menuItems = [...roleBasedItems, ...sharedItems];

  return (
    <Sidebar className="border-r border-royal-gold/10 bg-royal-obsidian">
      <SidebarHeader className="border-b border-royal-gold/10 p-6 bg-white/5">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
             <Crown className="h-8 w-8 text-royal-gold group-hover:rotate-12 transition-transform duration-500" />
             <div className="absolute -inset-1 bg-royal-gold/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-serif font-bold tracking-widest text-foreground group-hover:text-royal-gold transition-colors">
            ROYAL <span className="text-royal-gold">PALACE</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <RoleBasedSidebarMenu
              items={menuItems}
              currentRole={currentRole}
              pathname={pathname}
            />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
