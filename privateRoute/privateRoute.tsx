'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import {
  selectCurrentUser,
  selectAuthLoading,
} from '@/redux/features/auth/authSlice';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // ✅ Optional Role Guard
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const user = useSelector(selectCurrentUser);
  const loading = useSelector(selectAuthLoading);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // ✅ Redirect to login with return path
        router.replace(`/login?redirectTo=${encodeURIComponent(pathname)}`);
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        // ✅ Role not allowed — redirect to unauthorized
        router.replace('/unauthorized');
      }
    }
  }, [loading, user, router, pathname, allowedRoles]);

  // ✅ Show nothing while loading or not allowed
  if (loading || !user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
