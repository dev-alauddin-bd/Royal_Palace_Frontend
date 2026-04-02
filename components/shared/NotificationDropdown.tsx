// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import { X } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import {
//   clearAllNotifications,
//   removeNotification,
// } from '@/redux/features/notifications/notificationsSlice';

// interface NotificationDropdownProps {
//   onClose: () => void;
// }

// export function NotificationDropdown({ onClose }: NotificationDropdownProps) {
//   const dispatch = useDispatch();
//   const notifications = useSelector(
//     (state: RootState) => state.notification.notifications,
//   );

//   return (
//     <div className="absolute right-0 mt-12 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-4 z-50 max-h-96 overflow-auto border border-gray-200 dark:border-gray-700">
//       {/* Header: Title and Clear All */}
//       <div className="flex justify-between items-center mb-3">
//         <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
//           Notifications
//         </h4>
//         {notifications.length > 0 && (
//           <button
//             onClick={() => dispatch(clearAllNotifications())}
//             className="text-xs text-red-500 hover:text-red-700 transition"
//             aria-label="Clear all notifications"
//           >
//             Clear All
//           </button>
//         )}
//       </div>

//       {/* Notification list or empty message */}
//       {notifications.length === 0 ? (
//         <p className="text-gray-500 dark:text-gray-400 text-sm">
//           No new notifications
//         </p>
//       ) : (
//         <ul>
//           {notifications.map((noti) => (
//             <li
//               key={noti.id}
//               className="relative group mb-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg text-sm text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md transition"
//             >
//               <Link
//                 href={`/service/${noti.id}`}
//                 onClick={onClose}
//                 className="block font-medium text-blue-600 dark:text-blue-400 hover:underline pr-6"
//               >
//                 {noti.message}
//               </Link>

//               {/* Close Icon */}
//               <button
//                 onClick={() => dispatch(removeNotification(noti.id))}
//                 className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
//                 aria-label="Remove notification"
//               >
//                 <X className="w-4 h-4 text-red-500 hover:text-red-700" />
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Close Dropdown Button */}
//       <button
//         onClick={onClose}
//         className="mt-4 w-full text-center text-sm text-gray-600 dark:text-gray-300 hover:underline cursor-pointer"
//         aria-label="Close notifications"
//       >
//         Close
//       </button>
//     </div>
//   );
// }
