'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
  CartesianGrid,
} from 'recharts';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import DashboardSectionHeader from '@/components/dashboard/DashboardSectionHeader';
import { CreditCard, Search, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export interface Payment {
  _id: string;
  amount: number;
  paymentMethod: string;
  date: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
  createdAt: string;
}

export default function ReceptionistPaymentsPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: paymentData,
    isLoading,
    error,
  } = useGetPaymentsQuery({
    page,
    limit: 10,
    status: status === 'all' ? undefined : status,
    searchTerm,
  });

  const payments = paymentData?.data?.data || [];

  const chartData = [
    { name: 'PAID', total: payments.filter((p: Payment) => p.status === 'SUCCESS').length, color: '#10b981' },
    { name: 'PENDING', total: payments.filter((p: Payment) => p.status === 'PENDING').length, color: '#c5a021' },
    { name: 'FAILED', total: payments.filter((p: Payment) => p.status === 'FAILED').length, color: '#ef4444' },
    { name: 'CANCELLED', total: payments.filter((p: Payment) => p.status === 'CANCELLED').length, color: '#6b7280' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-10 min-h-screen">
      {/* ===== Header Section ===== */}
      <DashboardSectionHeader 
        title="Payments"
        subtitle="Process and monitor all guest transactions."
        icon={CreditCard}
        badge="Concierge Finance"
      />

      {/* ===== Top Controls ===== */}
      <div className="glass-panel p-6 border-royal-gold/10 flex flex-col md:flex-row gap-4 items-center shadow-sm dark:shadow-none">
        <div className="relative w-full flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-royal-gold" />
          <Input
            placeholder="Search by transaction ID or guest email..."
            className="pl-12 h-12 bg-white/5 border-royal-gold/10 text-foreground placeholder:text-muted-foreground/30 focus:border-royal-gold/50 transition-all rounded-none ring-0 focus-visible:ring-0"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select onValueChange={setStatus} defaultValue="all">
          <SelectTrigger className="w-full md:w-48 h-12 bg-white/5 border-royal-gold/10 text-foreground rounded-none focus:ring-0">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent className="bg-card border-royal-gold/20 rounded-none">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="SUCCESS">Paid</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="FAILED">Failed</SelectItem>
            <SelectItem value="CANCELLED">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ===== Chart Section ===== */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <Card className="glass-panel border-royal-gold/10 overflow-hidden shadow-sm dark:shadow-none h-full">
            <CardHeader className="border-b border-royal-gold/5 pb-6">
              <CardTitle className="text-lg font-[var(--font-cinzel)] text-foreground flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-royal-gold" />
                Revenue Flow
              </CardTitle>
              <CardDescription className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">Transaction Status</CardDescription>
            </CardHeader>
            <CardContent className="pt-10">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-royal-gold/5" />
                    <XAxis
                      dataKey="name"
                      stroke="currentColor"
                      className="text-muted-foreground"
                      fontSize={9}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="currentColor"
                      className="text-muted-foreground"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(197, 160, 33, 0.05)' }}
                      contentStyle={{
                        backgroundColor: 'var(--card)',
                        border: '1px solid rgba(197, 160, 33, 0.2)',
                        borderRadius: '0px',
                      }}
                      itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                      labelStyle={{ color: 'var(--foreground)', marginBottom: '4px', fontWeight: 'bold', fontSize: '12px' }}
                    />
                    <Bar dataKey="total">
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ===== Table Section ===== */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <Card className="glass-panel border-royal-gold/10 overflow-hidden shadow-sm dark:shadow-none h-full">
            <CardHeader className="border-b border-royal-gold/5 pb-6">
              <CardTitle className="text-lg font-[var(--font-cinzel)] text-foreground flex items-center gap-3">
                <Clock className="h-5 w-5 text-royal-gold" />
                Ledger Entries
              </CardTitle>
              <CardDescription className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">Latest Processing</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-20 text-center text-muted-foreground italic">Updating ledger...</div>
              ) : payments.length === 0 ? (
                <div className="p-20 text-center text-muted-foreground italic">No transactions found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table className="min-w-full border-collapse">
                    <TableHeader>
                      <TableRow className="bg-royal-gold/5 border-b border-royal-gold/10">
                        <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5">Transaction ID</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-right">Amount</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-center">Method</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-center">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment: Payment, idx: number) => (
                        <TableRow key={payment._id} className="border-b border-royal-gold/5 hover:bg-royal-gold/5 transition-colors group">
                          <TableCell className="px-8 py-5">
                             <div className="flex flex-col">
                                <p className="text-xs font-bold text-foreground group-hover:text-royal-gold transition-colors truncate max-w-[150px]">{payment._id}</p>
                                <p className="text-[9px] text-muted-foreground mt-1 uppercase tracking-tighter">{new Date(payment.createdAt).toLocaleString()}</p>
                             </div>
                          </TableCell>
                          <TableCell className="px-8 py-5 text-right font-[var(--font-cinzel)] font-bold text-foreground">
                            ${payment.amount.toLocaleString()}
                          </TableCell>
                          <TableCell className="px-8 py-5 text-center">
                             <Badge variant="outline" className="text-[9px] uppercase tracking-widest border-royal-gold/10 text-muted-foreground bg-royal-gold/5">
                                {payment.paymentMethod}
                             </Badge>
                          </TableCell>
                          <TableCell className="px-8 py-5 text-center">
                            <Badge
                              variant="outline"
                              className={`text-[9px] uppercase tracking-widest px-2 py-0.5 border-royal-gold/20 text-royal-gold bg-royal-gold/5 ${
                                payment.status === 'SUCCESS' 
                                  ? 'border-emerald-500/30 text-emerald-600 bg-emerald-500/5' 
                                  : payment.status === 'FAILED'
                                    ? 'border-rose-500/30 text-rose-500 bg-rose-500/5'
                                    : ''
                              }`}
                            >
                              {payment.status === 'SUCCESS' ? 'PAID' : payment.status.toUpperCase()}
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
        </motion.div>
      </div>
    </div>
  );
}
