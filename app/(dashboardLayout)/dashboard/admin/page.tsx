"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Percent,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi"
import { IBooking } from "@/types/booking.interface"

function AdminDashboard() {
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  console.log(dashboardData)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#bf9310] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#bf9310] font-semibold text-lg">Loading ...</p>
        </div>
      </div>
    )
  }

  if (!dashboardData?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">Unable to fetch dashboard data</p>
        </div>
      </div>
    )
  }

  const { stats, bookingStatusBreakdown, topCustomers, recentBookings } = dashboardData

  // Prepare chart data
  const statusColors = {
    booked: "#10b981",
    pending: "#f59e0b",
    cancelled: "#ef4444",
    InitiateCancel: "#f97316",
  }

  const statusData = bookingStatusBreakdown.map((item:any) => ({
    name: item._id,
    value: item.count,
    color: statusColors[item._id as keyof typeof statusColors] || "#6b7280",
  }))

  const revenueData = [
    { name: "Today", amount: stats.todaysRevenue },
    { name: "This Month", amount: stats.monthlyRevenue },
    { name: "Total", amount: stats.totalRevenue },
  ]

  const bookingData = [
    { name: "Today", bookings: stats.todaysBookings },
    { name: "This Month", bookings: stats.monthlyBookings },
    { name: "This Year", bookings: stats.yearlyBookings },
    { name: "Total", bookings: stats.totalBookings },
  ]

  const customerData = topCustomers.slice(0, 5).map((customer:any) => ({
    name: customer.name.length > 15 ? customer.name.substring(0, 15) + "..." : customer.name,
    spent: customer.totalSpent,
    bookings: customer.bookings,
  }))

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto space-y-8">
       

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBookings}</div>
              <p className="text-xs text-blue-100">{stats.monthlyBookings} this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-100">${stats.monthlyRevenue.toLocaleString()} this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Booking Value</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.avgBookingValue}</div>
              <p className="text-xs text-purple-100">Per booking average</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
              <Percent className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.occupancyRate}</div>
              <p className="text-xs text-orange-100">Current occupancy</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking Status Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Status Distribution</CardTitle>
              <CardDescription>Current booking status breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }:any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry:any, index:number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Revenue breakdown by period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Area type="monotone" dataKey="amount" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Second Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bookings Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Bookings Overview</CardTitle>
              <CardDescription>Booking counts by period</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="bookings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Customers Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>Customers by total spending</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={customerData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => [`$${value}`, "Total Spent"]} />
                  <Bar dataKey="spent" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Customer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Repeat Customers</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {stats.repeatCustomers}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">New Customers</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {stats.newCustomers}
                  </Badge>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-gray-600">
                    Customer Retention Rate:{" "}
                    {((stats.repeatCustomers / (stats.repeatCustomers + stats.newCustomers)) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentBookings.slice(0, 4).map((booking:IBooking) => (
                  <div key={booking._id} className="flex items-center justify-between p-3 bg-main rounded-lg">
                    <div className="flex items-center gap-3">
                      {booking.bookingStatus === "booked" && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {booking.bookingStatus === "pending" && <AlertCircle className="h-4 w-4 text-yellow-500" />}
                      {booking.bookingStatus === "cancelled" && <XCircle className="h-4 w-4 text-red-500" />}
                      {booking.bookingStatus === "InitiateCancel" && <XCircle className="h-4 w-4 text-orange-500" />}
                      <div>
                        <div className="font-medium text-sm">{booking.userId.name}</div>
                        <div className="text-xs text-gray-500">{booking.userId.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">${booking.totalAmount}</div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          booking.bookingStatus === "booked"
                            ? "border-green-200 text-green-700"
                            : booking.bookingStatus === "pending"
                              ? "border-yellow-200 text-yellow-700"
                              : "border-red-200 text-red-700"
                        }`}
                      >
                        {booking.bookingStatus}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
