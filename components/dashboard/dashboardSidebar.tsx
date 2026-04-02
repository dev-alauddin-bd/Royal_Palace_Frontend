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
  { title: 'Dashboard', url: '/dashboard/admin', icon: Crown },
  {
    title: 'Payments Management',
    url: '/dashboard/admin/payments',
    icon: CreditCard,
  },
  { title: 'Rooms Management', url: '/dashboard/admin/rooms', icon: Bed },
  {
    title: 'Bookings Management',
    url: '/dashboard/admin/bookings',
    icon: Calendar,
  },

  {
    title: 'Service Management',
    url: '/dashboard/admin/services',
    icon: Building,
  },
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
  { title: 'My Dashboard', url: '/dashboard/user', icon: Crown },
  { title: 'Booked Room', url: '/dashboard/user/bookings', icon: Bed },
  { title: 'Payments', url: '/dashboard/user/payments', icon: CreditCard },
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
    <Sidebar className="border-r bg-main">
      <SidebarHeader className="border-b p-4">
        <Link href="/" className="flex items-center space-x-2">
          <Crown className="h-8 w-8 text-[#bf9310]" />
          <span className="text-2xl font-bold text-yellow-500">
            ROYAL PALACE
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
