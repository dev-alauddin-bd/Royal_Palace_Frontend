'use client';

import React, { JSX } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Calendar, DollarSign } from 'lucide-react';
import { useGetDashboardDataQuery } from '@/redux/features/dashboard/dashboardApi';
import { IBooking } from '@/types/booking.interface';
import Loader from '@/components/shared/Loader';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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
    return <Loader />;
  }

  const stats = dashboardData?.data?.stats ?? [];
  const recentBookings = dashboardData?.data?.recentBookings ?? [];
  const pastBookings = dashboardData?.data?.pastBookings ?? [];

  return (
    <div className="space-y-6 px-4 py-6">
      {/* ===== 🔹 Header Section ===== */}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
        <h1 className="text-4xl font-serif font-bold text-foreground">
          Guest <span className="text-royal-gold italic">Dashboard</span>
        </h1>
        <div className="h-px bg-royal-gold/20 flex-grow mx-8 hidden sm:block" />
        <div className="royal-label !text-[10px]">Welcome Back</div>
      </div>

      {/* ===== 🔹 Stats Cards Section ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {stats.map((stat: IStat, index: number) => {
          return (
            <Card key={index} className="relative overflow-hidden bg-royal-obsidian/5 border border-royal-gold/10 rounded-none shadow-xl group hover:border-royal-gold/30 transition-all duration-500">
              <div className="absolute top-0 left-0 w-1 h-0 bg-royal-gold group-hover:h-full transition-all duration-500" />
              <CardHeader className="pb-2">
                <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-end justify-between pb-6">
                <div className="text-4xl font-serif font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="opacity-20 group-hover:opacity-100 transition-opacity duration-500 text-royal-gold">
                  {iconMap[stat.icon] || <DollarSign className="w-8 h-8" />}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ===== 🔹 Spending Chart Section ===== */}
      <Card className="bg-royal-obsidian/5 border border-royal-gold/10 rounded-none shadow-2xl overflow-hidden mb-12">
        <CardHeader className="border-b border-royal-gold/10 bg-white/5 py-6">
          <CardTitle className="text-xl font-serif font-bold text-foreground flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-royal-gold rotate-45" />
            Spending History
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-10 pb-6">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData?.data?.spendingHistory || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="#ffffff40" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#ffffff60', fontWeight: 'bold' }}
                />
                <YAxis 
                  stroke="#ffffff40" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                  tick={{ fill: '#ffffff60', fontWeight: 'bold' }}
                />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ 
                    backgroundColor: '#0a0a0a', 
                    border: '1px solid rgba(191,147,16,0.2)',
                    borderRadius: '0px',
                    fontSize: '10px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em'
                  }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#bf9310" 
                  radius={[2, 2, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* ===== 🔹 Recent Bookings Section ===== */}
      <Card className="bg-royal-obsidian/5 border border-royal-gold/10 rounded-none shadow-2xl overflow-hidden mb-12">
        <CardHeader className="border-b border-royal-gold/10 bg-white/5 py-6">
          <CardTitle className="text-xl font-serif font-bold text-foreground flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-royal-gold rotate-45" />
            Your Recent Bookings
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {recentBookings.length === 0 ? (
            <div className="p-12 text-center">
               <p className="text-foreground/30 font-serif italic italic">You have no recent bookings at this time.</p>
            </div>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="bg-royal-obsidian text-[10px] uppercase tracking-[0.2em] font-bold text-royal-gold/60 border-b border-royal-gold/10">
                  {['Room Suite', 'Arrival', 'Departure', 'Status', 'Investment'].map(
                    (head) => (
                      <th
                        key={head}
                        className="px-8 py-5 text-left font-bold"
                      >
                        {head}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-royal-gold/5">
                {recentBookings.map((booking: IBooking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-royal-gold/[0.02] transition-colors group"
                  >
                    <td className="px-8 py-6 text-foreground font-serif font-bold">
                      {booking.rooms?.[0]?.roomId?.title || 'N/A'}
                    </td>
                    <td className="px-8 py-6 text-foreground/70 text-sm">
                      {booking.rooms?.[0]?.checkInDate
                        ? new Date(
                            booking.rooms[0].checkInDate,
                          ).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
                        : '-'}
                    </td>
                    <td className="px-8 py-6 text-foreground/70 text-sm">
                      {booking.rooms?.[0]?.checkOutDate
                        ? new Date(
                            booking.rooms[0].checkOutDate,
                          ).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
                        : '-'}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`inline-flex items-center px-3 py-1 text-[9px] font-bold uppercase tracking-widest border ${
                        booking.bookingStatus === 'Confirmed' 
                        ? 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5'
                        : 'border-royal-gold/30 text-royal-gold bg-royal-gold/5'
                      }`}>
                        {booking.bookingStatus}
                      </span>
                    </td>
                    <td className="px-8 py-6 font-serif font-bold text-royal-gold">
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
