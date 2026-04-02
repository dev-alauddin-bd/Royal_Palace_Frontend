// ====================================================
// 🧾 Custom React Hook for User Logout Handling
// ====================================================

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { logout } from '@/redux/features/auth/authSlice';

// ===== Hook to handle user logout logic =====
export function useLogout() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // ===== Function to logout user =====
  const logoutUser = async () => {
    try {
      // Call backend logout endpoint with credentials (cookies)
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      // Clear auth state in Redux store
      dispatch(logout());

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      // Log any errors encountered during logout
      console.error('Logout failed', error);
    }
  };

  return logoutUser;
}
