'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import {
  useCancelBookingMutation,
  useGetBookingsByUserIdQuery,
} from '@/redux/features/booking/bookingApi';
import { IBooking } from '@/types/booking.interface';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '@/components/shared/Loader';
import DashboardSectionHeader from '@/components/dashboard/DashboardSectionHeader';
import { Calendar, Bed, Clock, ArrowRight, ShieldX } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserBookings() {
  const user = useSelector(selectCurrentUser);
  const { data: bookingData, isLoading } = useGetBookingsByUserIdQuery(
    user?._id ?? '',
  );
  const [cancelBooking] = useCancelBookingMutation();

  const cancelBookingHandeller = async (bookingId: string) => {
    if (!confirm('Are you sure you wish to withdraw this royal reservation?')) return;
    try {
      await cancelBooking(bookingId).unwrap();
      toast.success('Reservation withdrawn successfully');
    } catch (error) {
      toast.error('Error withdrawing reservation');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 md:p-8 space-y-10 min-h-screen">
      {/* ===== Header Section ===== */}
      <DashboardSectionHeader 
        title="My Bookings"
        subtitle="Review your current and past stays."
        icon={Bed}
      />

      {/* ===== Bookings Table ===== */}
      <Card className="glass-panel border-royal-gold/10 overflow-hidden shadow-sm dark:shadow-none p-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-full border-collapse">
              <TableHeader>
                <TableRow className="bg-royal-gold/5 border-b border-royal-gold/10 hover:bg-royal-gold/5">
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5">Suite Details</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-center">Dates</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-right">Total</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-center">Status</TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(!bookingData?.data || bookingData.data.length === 0) ? (
                   <tr>
                     <td colSpan={5} className="p-20 text-center text-muted-foreground italic">No reservations found in your history.</td>
                   </tr>
                 ) : (
                   bookingData.data.map((booking: IBooking, idx: number) => (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-royal-gold/5 hover:bg-royal-gold/5 transition-colors group"
                    >
                      <TableCell className="px-8 py-5">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-royal-gold/10 flex items-center justify-center border border-royal-gold/20">
                               <Bed className="w-4 h-4 text-royal-gold" />
                            </div>
                            <div>
                               <p className="text-sm font-bold text-foreground group-hover:text-royal-gold transition-colors truncate max-w-[200px]">
                                 {booking.rooms?.map((r) => r.roomId && typeof r.roomId === 'object' && 'title' in r.roomId ? r.roomId.title : 'Luxury Room').join(', ')}
                               </p>
                               <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mt-1">{booking.rooms.length} Room(s)</p>
                            </div>
                         </div>
                      </TableCell>

                      <TableCell className="px-8 py-5 text-center">
                         <div className="inline-flex items-center gap-2 text-xs text-foreground/80 font-medium">
                            <span>{booking.rooms[0]?.checkInDate ? new Date(booking.rooms[0].checkInDate).toLocaleDateString() : '-'}</span>
                            <ArrowRight className="w-3 h-3 text-royal-gold" />
                            <span>{booking.rooms[0]?.checkOutDate ? new Date(booking.rooms[0].checkOutDate).toLocaleDateString() : '-'}</span>
                         </div>
                      </TableCell>

                      <TableCell className="px-8 py-5 text-right font-[var(--font-cinzel)] font-bold text-foreground">
                        ${booking.totalAmount.toFixed(2)}
                      </TableCell>

                      <TableCell className="px-8 py-5 text-center">
                        <Badge
                          variant="outline"
                          className={`text-[9px] uppercase tracking-widest px-2 py-0.5 border-royal-gold/20 text-royal-gold bg-royal-gold/5 ${
                            ['booked', 'confirmed'].includes(booking.bookingStatus.toLowerCase())
                              ? 'border-emerald-500/30 text-emerald-600 bg-emerald-500/5' 
                              : booking.bookingStatus.toLowerCase() === 'cancelled'
                                ? 'border-rose-500/30 text-rose-500 bg-rose-500/5'
                                : ''
                          }`}
                        >
                          {booking.bookingStatus}
                        </Badge>
                      </TableCell>

                      <TableCell className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => cancelBookingHandeller(booking._id)}
                            disabled={['cancelled', 'pending', 'failed'].includes(booking.bookingStatus.toLowerCase())}
                            className="text-[9px] font-bold uppercase tracking-widest text-red-400 hover:text-red-300 disabled:opacity-20 disabled:grayscale transition-all flex items-center gap-2"
                          >
                            <ShieldX className="w-3 h-3" /> Withdrawal
                          </button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <Toaster position="top-right" />
    </div>
  );
}
