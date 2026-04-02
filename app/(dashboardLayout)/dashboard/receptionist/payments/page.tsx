// ====================================================
// 🧾  Receptionist Payments Page Component
// ====================================================

'use client';

import React, { useState } from 'react';
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
import { useGetPaymentsQuery } from '@/redux/features/payment/paymentApi';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

// ===== 🔹 Payment Type Definition =====
export interface Payment {
  _id: string;
  amount: number;
  paymentMethod: string;
  date: string;
  status: 'completed' | 'pending' | 'failed' | 'cancled' | 'refunded';
  createdAt: string;
}

// ===== 🔁 ReceptionistPaymentsPage Component =====
export default function ReceptionistPaymentsPage() {
  // ===== 🔹 State variables for pagination, filter, search =====
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // ===== 🔹 Fetch payments data via RTK Query =====
  const {
    data: paymentData,
    isLoading,
    error,
  } = useGetPaymentsQuery({
    page,
    limit: 10,
    status,
    searchTerm,
  });

  const payments = paymentData?.data || [];

  // ===== 🔹 Prepare data for BarChart visualization =====
  const chartData = [
    {
      status: 'Paid',
      total: payments.filter((p: Payment) => p.status === 'completed').length,
    },
    {
      status: 'Pending',
      total: payments.filter((p: Payment) => p.status === 'pending').length,
    },
    {
      status: 'Failed',
      total: payments.filter((p: Payment) => p.status === 'failed').length,
    },
    {
      status: 'Cancelled',
      total: payments.filter((p: Payment) => p.status === 'cancled').length,
    },
    {
      status: 'Refunded',
      total: payments.filter((p: Payment) => p.status === 'refunded').length,
    },
  ];

  return (
    <div className="space-y-6 p-4">
      {/* ===== 🔹 Header and Filter Controls ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Payments</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* 🔍 Search Input */}
          <Input
            placeholder="Search by guest/email"
            className="bg-main text-foreground"
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* 🔽 Status Filter Select */}
          <Select
            onValueChange={(value) => setStatus(value)}
            defaultValue="all"
          >
            <SelectTrigger className="w-[150px] bg-main text-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-main text-foreground">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="completed">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ===== 🔹 Payment Status Bar Chart ===== */}
      <Card className="bg-main">
        <CardHeader>
          <CardTitle className="text-foreground">
            Payment Status Chart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="status"
                stroke="#8884d8"
                tick={{ fill: '#eab308', fontWeight: 600 }}
                axisLine={{ stroke: '#6366f1' }}
                tickLine={{ stroke: '#6366f1' }}
              />
              <YAxis
                stroke="#8884d8"
                tick={{ fill: '#facc15', fontWeight: 600 }}
                axisLine={{ stroke: '#6366f1' }}
                tickLine={{ stroke: '#6366f1' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: 8,
                }}
                labelStyle={{ color: '#facc15' }}
                itemStyle={{ color: '#fff' }}
              />
              <Bar dataKey="total">
                {chartData.map((entry, index) => {
                  let color = '#facc15'; // default yellow

                  switch (entry.status.toLowerCase()) {
                    case 'paid':
                      color = '#10b981'; // green
                      break;
                    case 'pending':
                      color = '#f59e0b'; // amber
                      break;
                    case 'failed':
                      color = '#ef4444'; // red
                      break;
                    case 'cancelled':
                      color = '#6b7280'; // gray
                      break;
                    case 'refunded':
                      color = '#3b82f6'; // blue
                      break;
                  }

                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ===== 🔹 Payments Table ===== */}
      <Card className="bg-main">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-foreground p-4">Loading payments...</p>
          ) : error ? (
            <p className="text-red-500 p-4">
              Error:{' '}
              {typeof error === 'string'
                ? error
                : 'status' in (error as any)
                  ? `Status: ${(error as any).status}`
                  : (error as any)?.message || 'An error occurred'}
            </p>
          ) : payments.length === 0 ? (
            <p className="text-foreground p-4">No payments found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border">
                    <TableHead className="text-foreground">
                      Transaction ID
                    </TableHead>
                    <TableHead className="text-foreground">Amount</TableHead>
                    <TableHead className="text-foreground">Method</TableHead>
                    <TableHead className="text-foreground">Date</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment: Payment) => (
                    <TableRow key={payment._id}>
                      <TableCell className="text-foreground">
                        {payment._id}
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">
                        ${payment.amount}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {payment.paymentMethod}
                      </TableCell>
                      <TableCell className="text-foreground">
                        {payment.createdAt}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            payment.status === 'completed'
                              ? 'bg-emerald-600 hover:bg-emerald-700'
                              : payment.status === 'pending'
                                ? 'bg-amber-600 hover:bg-amber-700'
                                : payment.status === 'failed'
                                  ? 'bg-red-600 hover:bg-red-700'
                                  : payment.status === 'cancled'
                                    ? 'bg-gray-500 hover:bg-gray-600'
                                    : 'bg-blue-600 hover:bg-blue-700'
                          }
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
