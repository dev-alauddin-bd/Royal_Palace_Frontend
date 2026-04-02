// // ====================================================
// // 🧾 Custom Hook: useSocket - Manage socket.io connection based on authenticated user
// // ====================================================

// import { useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
// import { selectCurrentUser } from '@/redux/features/auth/authSlice';
// import { io, Socket } from 'socket.io-client';

// export const useSocket = () => {
//   // ===== Get current authenticated user from Redux store =====
//   const user = useSelector(selectCurrentUser);

//   // ===== Ref to hold socket instance =====
//   const socketRef = useRef<Socket | null>(null);

//   useEffect(() => {
//     // ===== Initialize socket only if user exists and socket is not already connected =====
//     if (user && !socketRef.current) {
//       const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL as string, {
//         withCredentials: true,
//         transports: ['websocket', 'polling'],
//         query: {
//           userId: user._id,
//           role: user.role,
//         },
//       });

//       // ===== Optional: Setup socket event listeners here =====
//       // socket.on('notification', (data) => {
//       //   console.log('Notification received', data);
//       // });

//       socketRef.current = socket;
//     }

//     // ===== Cleanup: Disconnect socket when component unmounts or user changes =====
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         socketRef.current = null;
//       }
//     };
//   }, [user]);

//   // ===== Return current socket instance =====
//   return socketRef.current;
// };
