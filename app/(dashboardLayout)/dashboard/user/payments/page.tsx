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
import { useGetPaymentsByUserIdQuery } from '@/redux/features/payment/paymentApi';

const statusColorMap: Record<string, string> = {
  completed: 'bg-emerald-600',
  pending: 'bg-yellow-600',
  failed: 'bg-red-600',
  cancel: 'bg-red-600',
  booked: 'bg-green-600',
  claimRefund: 'bg-blue-600',
  // Add more if needed
};

export default function UserPayments() {
  const user = useSelector(selectCurrentUser);
  const id = user?._id;
  const { data: paymentsData, isLoading } = useGetPaymentsByUserIdQuery(id!);

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
    <div className="space-y-6 px-4 py-6">
      {/* ===== 🔹 Page Header ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">Payments</h1>
      </div>

      {/* ===== 🔹 Payments Table ===== */}
      <Card className="bg-main border border-slate-700 shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Payments</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#2a2d38] text-white">
              <TableRow>
                {['Transaction ID', 'Amount', 'Method', 'Status', 'Date'].map(
                  (head) => (
                    <TableHead
                      key={head}
                      className="text-white border border-slate-700"
                    >
                      {head}
                    </TableHead>
                  ),
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentsData?.data?.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center p-4 text-foreground border border-slate-700"
                  >
                    No payments found.
                  </TableCell>
                </TableRow>
              )}
              {paymentsData?.data?.map((payment: any) => (
                <TableRow
                  key={payment._id}
                  className="border border-slate-700 hover:bg-slate-800/50 transition"
                >
                  <TableCell className="text-foreground border border-slate-700">
                    {payment.transactionId}
                  </TableCell>

                  <TableCell className="text-green-400 font-semibold border border-slate-700">
                    ${payment.amount}
                  </TableCell>
                  <TableCell className="text-foreground border border-slate-700">
                    {payment.paymentMethod}
                  </TableCell>
                  <TableCell className="border border-slate-700">
                    <Badge
                      className={`text-white capitalize ${
                        statusColorMap[payment.status] || 'bg-gray-600'
                      }`}
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-foreground border border-slate-700">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
