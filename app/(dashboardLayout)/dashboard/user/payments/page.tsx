"use client"

import { CreditCard, DollarSign, TrendingUp, Clock, ArrowUpRight, Download, Calendar, ArrowRight, Receipt } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import DashboardSectionHeader from "@/components/dashboard/DashboardSectionHeader"
import DashboardChart from "@/components/dashboard/DashboardChart"
import { useGetDashboardDataQuery } from "@/redux/features/dashboard/dashboardApi"
import { useGetPaymentsByUserIdQuery } from "@/redux/features/payment/paymentApi"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import Loader from "@/components/shared/Loader"
import { motion } from "framer-motion"

export default function UserPaymentsPage() {
  const user = useSelector(selectCurrentUser)
  const { data: dashboardData, isLoading: isDashboardLoading } = useGetDashboardDataQuery(user?._id || "")
  const { data: paymentData, isLoading: isPaymentLoading } = useGetPaymentsByUserIdQuery(user?._id || "")

  if (isDashboardLoading || isPaymentLoading) return <Loader />

  const { stats = [], spendingHistory = [] } = dashboardData?.data || {}
  const payments = paymentData?.data || []

  // Find the "Total Paid Amount" from stats array
  const totalPaid = stats.find((s: any) => s.title.includes("Paid Amount"))?.value || "$0"

  return (
    <div className="p-4 md:p-8 space-y-10 min-h-screen">
      {/* ===== Header Section ===== */}
      <DashboardSectionHeader 
        title="My Payments"
        subtitle="Review your payment history and invoices."
        icon={CreditCard}
        badge="Account History"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
          <Card className="glass-panel border-royal-gold/10 shadow-sm dark:shadow-none bg-royal-gold/5 h-full relative overflow-hidden group">
            <CardHeader className="pb-2">
               <span className="text-[10px] uppercase tracking-[0.2em] text-accent-foreground font-bold">Total Paid</span>
            </CardHeader>
            <CardContent>
               <div className="text-4xl font-[var(--font-cinzel)] font-bold text-foreground mb-1">{totalPaid}</div>
               <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">All-time confirmed stays</p>
               <DollarSign className="absolute top-6 right-6 w-12 h-12 text-royal-gold/10 group-hover:text-royal-gold/20 transition-colors" />
               
               <div className="mt-8 pt-6 border-t border-royal-gold/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Active Stays</span>
                    <span className="text-sm font-bold text-royal-gold">{payments.filter((p: any) => p.status === 'SUCCESS').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Invoices</span>
                    <span className="text-sm font-bold text-royal-gold">{payments.length}</span>
                  </div>
               </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="lg:col-span-2">
           <DashboardChart 
              title="Lunar Spending History"
              description="Monthly overview of your luxury investments"
              icon={TrendingUp}
              data={spendingHistory}
              type="bar"
              dataKey="amount"
              xAxisKey="month"
              prefix="$"
           />
        </div>
      </div>

      <Card className="glass-panel border-royal-gold/10 shadow-sm dark:shadow-none p-0 overflow-hidden">
        <CardHeader className="bg-royal-gold/5 border-b border-royal-gold/10 p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               <div>
                  <CardTitle className="text-lg font-[var(--font-cinzel)] font-bold text-foreground">Transaction History</CardTitle>
                  <CardDescription className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold mt-1">Confirmed Records</CardDescription>
               </div>
               <button className="h-10 px-6 border border-royal-gold/20 text-[10px] font-bold uppercase tracking-widest text-foreground hover:bg-royal-gold/10 transition-all flex items-center gap-2">
                  <Download className="w-3 h-3" /> EXPORT ALL DATA
               </button>
            </div>
        </CardHeader>
        <CardContent className="p-0">
           <div className="overflow-x-auto">
             <Table>
               <TableHeader>
                 <TableRow className="bg-royal-gold/5 border-b border-royal-gold/10 hover:bg-royal-gold/5">
                   <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5">Reference ID</TableHead>
                   <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5">Date</TableHead>
                   <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-right">Amount</TableHead>
                   <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-center">Status</TableHead>
                   <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-right">Action</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {payments.length === 0 ? (
                   <tr>
                     <td colSpan={5} className="p-20 text-center text-muted-foreground italic">No historical invoices found.</td>
                   </tr>
                 ) : (
                   payments.map((payment: any, idx: number) => (
                    <motion.tr
                      key={payment._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-royal-gold/5 hover:bg-royal-gold/5 transition-colors group"
                    >
                      <TableCell className="px-8 py-5">
                         <span className="text-xs font-mono text-royal-gold/80">{payment.transactionId}</span>
                      </TableCell>
                      <TableCell className="px-8 py-5">
                         <span className="text-xs font-medium text-muted-foreground">{new Date(payment.createdAt).toLocaleDateString()}</span>
                      </TableCell>
                      <TableCell className="px-8 py-5 text-right font-[var(--font-cinzel)] font-bold text-foreground">
                        ${payment.amount.toFixed(2)}
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
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-8 py-5 text-right">
                         <button className="text-[9px] font-bold uppercase tracking-widest text-foreground hover:text-royal-gold transition-colors flex items-center gap-2 ml-auto">
                            <Receipt className="w-3 h-3" /> INVOICE
                         </button>
                      </TableCell>
                    </motion.tr>
                   ))
                 )}
               </TableBody>
             </Table>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}
