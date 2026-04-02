// ====================================================
// 🧾 Receptionist Dashboard Component
// ====================================================

'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Bed } from 'lucide-react';
import { Cell, Tooltip, Legend, BarChart, XAxis, YAxis, Bar } from 'recharts';
import { useGetDashboardDataQuery } from '@/redux/features/dashboard/dashboardApi';
import { IBooking } from '@/types/booking.interface';

// ===== 🔹 Interface for Stat Card Data =====
interface IStatCardData {
  title: string;
  value: number | string;
  change: string;
  color: string;
  icon: keyof typeof iconMap;
}

// ===== 🔹 Icon Mapping for Stat Cards =====
const iconMap = {
  Calendar: <Calendar className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  Bed: <Bed className="h-6 w-6" />,
};

// ===== 🔹 Colors for Bar Chart =====
const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

function ReceptionistDashboard() {
  // ===== 🔹 Fetch dashboard data using RTK Query =====
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // ===== 🔹 Loading state UI =====
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

  // ===== 🔹 Extract stats and bookings data =====
  const stats = dashboardData?.stats ?? [];
  const bookings = dashboardData?.bookings ?? [];

  // ===== 🔹 Calculate booking status counts for the chart =====
  const statusCount: Record<string, number> = {};
  bookings.forEach((booking: IBooking) => {
    const status = booking.bookingStatus || 'unknown';
    statusCount[status] = (statusCount[status] || 0) + 1;
  });

  // ===== 🔹 Prepare data for Bar Chart =====
  const pieChartData = Object.entries(statusCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="space-y-8 px-4 py-6">
      {/* ===== 🔹 Dashboard Title ===== */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-1">
          Receptionist Dashboard
        </h2>
      </div>

      {/* ===== 🔹 Stat Cards Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat: IStatCardData, index: number) => (
          <Card key={index} className="bg-main backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {stat.value}
                </div>
                <p className={`text-xs ${stat.color}`}>
                  {stat.change} from yesterday
                </p>
              </div>
              <div className="text-foreground">{iconMap[stat.icon]}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ===== 🔹 Booking Status Bar Chart ===== */}
      <Card className="bg-main backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground">
            Booking Status Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <div className="w-full">
            <BarChart width={400} height={250} data={pieChartData}>
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value">
                {pieChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </div>
        </CardContent>
      </Card>

      {/* ===== 🔹 Recent Bookings Table ===== */}
      <Card className="bg-main backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-foreground">
            <thead>
              <tr className="border-b border-slate-600">
                <th className="py-2">Guest</th>
                <th>Room</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking: IBooking) => (
                <tr key={booking._id} className="border-b">
                  <td className="py-2">{booking.userId?.name || 'N/A'}</td>
                  <td>{booking.rooms?.[0]?.roomId?.title || 'N/A'}</td>
                  <td>${booking.totalAmount}</td>
                  <td>
                    <Badge className="capitalize">
                      {booking.bookingStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReceptionistDashboard;
