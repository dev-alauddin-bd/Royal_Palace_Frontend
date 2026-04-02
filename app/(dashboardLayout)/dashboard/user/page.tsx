'use client';

import React, { JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Calendar, DollarSign } from 'lucide-react';
import { useGetDashboardDataQuery } from '@/redux/features/dashboard/dashboardApi';
import { IBooking } from '@/types/booking.interface';

export interface IStat {
  title: string;
  value: number;
  icon: string;
}
const statusColorMap: Record<string, string> = {
  success: 'bg-emerald-600',
  pending: 'bg-yellow-600',
  failed: 'bg-red-600',
  cancel: 'bg-red-600',
  booked: 'bg-green-600',
  initialCancel: 'bg-orange-600',
  // Add more if needed
};
const iconMap: Record<string, JSX.Element> = {
  Bed: <Bed className="h-8 w-8 text-foreground" />,
  Calendar: <Calendar className="h-8 w-8 text-foreground" />,
  DollarSign: <DollarSign className="h-8 w-8 text-foreground" />,
};

function GuestDashboard() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );

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

  const stats = dashboardData?.stats ?? [];
  const recentBookings = dashboardData?.recentBookings ?? [];
  const pastBookings = dashboardData?.pastBookings ?? [];

  return (
    <div className="space-y-6 px-4 py-6">
      {/* ===== 🔹 Header Section ===== */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Guest Dashboard</h1>
      </div>

      {/* ===== 🔹 Stats Cards Section ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat: IStat, index: number) => {
          return (
            <Card key={index} className="shadow-md bg-main border-slate-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-foreground/80">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div>{iconMap[stat.icon]}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ===== 🔹 Recent Bookings Section ===== */}
      <Card className="bg-main border border-slate-700 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-foreground">
            Your Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {recentBookings.length === 0 ? (
            <p className="text-foreground italic">
              You have no recent bookings.
            </p>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#2a2d38] text-white">
                <tr>
                  {['Room', 'Check-in', 'Check-out', 'Status', 'Amount'].map(
                    (head) => (
                      <th
                        key={head}
                        className="p-3 font-medium border border-slate-700"
                      >
                        {head}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking: IBooking) => (
                  <tr
                    key={booking._id}
                    className="border border-slate-700 hover:bg-slate-800/50 transition"
                  >
                    <td className="p-3 text-foreground border border-slate-700">
                      {booking.rooms?.[0]?.roomId?.title || 'N/A'}
                    </td>
                    <td className="p-3 text-foreground border border-slate-700">
                      {booking.rooms?.[0]?.checkInDate
                        ? new Date(
                            booking.rooms[0].checkInDate,
                          ).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="p-3 text-foreground border border-slate-700">
                      {booking.rooms?.[0]?.checkOutDate
                        ? new Date(
                            booking.rooms[0].checkOutDate,
                          ).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="p-3 border border-slate-700">
                      <Badge
                        className={`text-white capitalize ${
                          statusColorMap[booking?.bookingStatus] ||
                          'bg-gray-600'
                        }`}
                      >
                        {booking.bookingStatus}
                      </Badge>
                    </td>
                    <td className="p-3 font-semibold text-green-400 border border-slate-700">
                      ${booking.totalAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* ===== 🔹 Past Bookings Section ===== */}
      <Card className="bg-main border border-slate-700 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-foreground">Your Past Bookings</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {pastBookings.length === 0 ? (
            <p className="text-foreground italic">No past bookings found.</p>
          ) : (
            <table className="min-w-full text-sm text-left">
              <thead className="bg-[#2a2d38] text-white">
                <tr>
                  {['Room', 'Check-out Date', 'Status', 'Amount'].map(
                    (head) => (
                      <th
                        key={head}
                        className="p-3 font-medium border border-slate-700"
                      >
                        {head}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {pastBookings.map((booking: IBooking) => (
                  <tr
                    key={booking._id}
                    className="border border-slate-700 hover:bg-slate-800/50 transition"
                  >
                    <td className="p-3 text-foreground border border-slate-700">
                      {booking.rooms?.[0]?.roomId?.title || 'N/A'}
                    </td>
                    <td className="p-3 text-foreground border border-slate-700">
                      {booking.rooms?.[0]?.checkOutDate
                        ? new Date(
                            booking.rooms[0].checkOutDate,
                          ).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="p-3 border border-slate-700">
                      <Badge
                        className={`text-white capitalize ${
                          statusColorMap[booking?.bookingStatus] ||
                          'bg-gray-600'
                        }`}
                      >
                        {booking.bookingStatus}
                      </Badge>
                    </td>
                    <td className="p-3 font-semibold text-green-400 border border-slate-700">
                      ${booking.totalAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default GuestDashboard;
