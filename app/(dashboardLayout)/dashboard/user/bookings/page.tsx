'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const statusColorMap: Record<string, string> = {
  success: 'bg-emerald-600',
  pending: 'bg-yellow-600',
  failed: 'bg-red-600',
  cancel: 'bg-red-600',
  booked: 'bg-green-600',
  initialCancel: 'bg-orange-600',
  // Add more if needed
};
export default function UserBookings() {
  const user = useSelector(selectCurrentUser);
  const { data: bookingData, isLoading } = useGetBookingsByUserIdQuery(
    user?._id ?? '',
  );
  const [cancelBooking] = useCancelBookingMutation();

  const cancelBookingHandeller = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
    } catch (error) {
      console.error(error);
      toast.error('Error cancelling booking');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#bf9310] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#bf9310] font-semibold text-lg">Loading ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ===== 🔹 Page Header ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Booked Rooms</h1>
      </div>

      {/* ===== 🔹 Bookings Table ===== */}
      <Card className="bg-main border border-slate-700 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-[#2a2d38]">
                <TableRow>
                  {[
                    'Room Title',
                    'Room Count',
                    'Check-in',
                    'Check-out',
                    'Amount',
                    'Status',
                    'Action',
                  ].map((header) => (
                    <TableHead
                      key={header}
                      className="text-white border border-slate-700"
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookingData?.data.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center p-4 text-foreground border border-slate-700"
                    >
                      No bookings found.
                    </TableCell>
                  </TableRow>
                )}
                {bookingData?.data.map((booking: IBooking) => (
                  <TableRow
                    key={booking._id}
                    className="border border-slate-700 hover:bg-slate-800/50 transition duration-200"
                  >
                    <TableCell className="text-foreground border border-slate-700">
                      {booking.rooms
                        ?.map((r) =>
                          r.roomId && 'title' in r.roomId
                            ? r.roomId.title
                            : 'Untitled Room',
                        )
                        .join(', ')}
                    </TableCell>

                    <TableCell className="text-foreground border border-slate-700">
                      {booking.rooms.length}
                    </TableCell>

                    <TableCell className="text-foreground border border-slate-700">
                      {booking.rooms[0]?.checkInDate
                        ? new Date(
                            booking.rooms[0].checkInDate,
                          ).toLocaleDateString()
                        : '-'}
                    </TableCell>

                    <TableCell className="text-foreground border border-slate-700">
                      {booking.rooms[0]?.checkOutDate
                        ? new Date(
                            booking.rooms[0].checkOutDate,
                          ).toLocaleDateString()
                        : '-'}
                    </TableCell>

                    <TableCell className="text-green-400 font-semibold border border-slate-700">
                      ${booking.totalAmount}
                    </TableCell>

                    <TableCell className="border border-slate-700">
                      <Badge
                        className={`text-white capitalize ${
                          statusColorMap[booking?.bookingStatus] ||
                          'bg-gray-600'
                        }`}
                      >
                        {booking.bookingStatus}
                      </Badge>
                    </TableCell>

                    <TableCell className="border border-slate-700">
                      <Button
                        variant="outline"
                        onClick={() => cancelBookingHandeller(booking._id)}
                        disabled={['cancelled', 'pending', 'failed'].includes(
                          booking.bookingStatus,
                        )}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
