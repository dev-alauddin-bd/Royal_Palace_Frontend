// 'use client';

// import { useEffect } from 'react';
// import { useSocket } from '@/hooks/useSocket';
// import { useAppDispatch } from '@/redux/hooks'; // তোমার redux hooks থেকে import করো
// import { addNotification } from '@/redux/features/notifications/notificationsSlice';

// const EVENTS: { event: string; getMessage: (payload: any) => string }[] = [
//   {
//     event: 'booking-created',
//     getMessage: (data) => `New booking for room ${data.room}`,
//   },
//   {
//     event: 'room-created',
//     getMessage: (data) => `New room created: ${data.name}`,
//   },
//   {
//     event: 'user-created',
//     getMessage: (data) => `New user registered: ${data.name || data.email}`,
//   },
//   {
//     event: 'service-added',
//     getMessage: (data) => `New service added: ${data.name}`,
//   },
//   {
//     event: 'payment-initiated',
//     getMessage: (data) => `Payment initiated for booking ${data.bookingId}`,
//   },
//   {
//     event: 'booking-cancelled',
//     getMessage: (data) => `Booking cancelled for booking ${data.bookingId}`,
//   },
// ];

// const SocketNotificationListener = () => {
//   const socket = useSocket();
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (!socket) return;

//     const handlers = EVENTS.map(({ event, getMessage }) => {
//       const handler = (payload: any) => {
//         dispatch(
//           addNotification({
//             id: payload.id || payload._id || `${event}-${Date.now()}`,
//             message: getMessage(payload),
//             time: new Date().toISOString(),
//             isRead: false,
//           }),
//         );
//       };
//       socket.on(event, handler);
//       return { event, handler };
//     });

//     return () => {
//       handlers.forEach(({ event, handler }) => {
//         socket.off(event, handler);
//       });
//     };
//   }, [socket, dispatch]);

//   return null;
// };

// export default SocketNotificationListener;
