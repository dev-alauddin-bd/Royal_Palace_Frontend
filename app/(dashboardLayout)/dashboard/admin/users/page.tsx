'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Search, Eye, Edit, Trash2, Users, MoreHorizontal } from 'lucide-react';
import { useGetUsersQuery } from '@/redux/features/auth/authApi';
import Pagination from '@/components/shared/pagination';
import { IUser } from '@/types/auth.interface';
import DashboardSectionHeader from '@/components/dashboard/DashboardSectionHeader';
import { motion } from 'framer-motion';

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: userData, isLoading } = useGetUsersQuery({
    searchTerm,
    page,
    limit,
  });

  const total = userData?.meta?.total || 1;

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen">
      {/* ===== Header Section ===== */}
      <DashboardSectionHeader 
        title="Manage Users"
        subtitle="Monitor and manage all registered users and members."
        icon={Users}
      />

      {/* ===== Search Input Section ===== */}
      <div className="glass-panel p-6 border-royal-gold/10 shadow-sm dark:shadow-none">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-royal-gold" />
          <Input
            placeholder="Search by name, email, or role..."
            className="pl-12 h-12 bg-white/5 border-royal-gold/10 text-foreground placeholder:text-muted-foreground/30 focus:border-royal-gold/50 transition-all rounded-none ring-0 focus-visible:ring-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ===== Users Table Section ===== */}
      <Card className="glass-panel border-royal-gold/10 overflow-hidden shadow-sm dark:shadow-none p-0">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-20 text-center text-muted-foreground italic">Opening the royal scrolls...</div>
          ) : userData?.data?.length === 0 ? (
            <div className="p-20 text-center text-muted-foreground italic">No subjects found in the current registry.</div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full border-collapse">
                <TableHeader>
                  <TableRow className="bg-royal-gold/5 border-b border-royal-gold/10 hover:bg-royal-gold/5">
                    <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-left">User</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-left">Contact Info</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-center">Role</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-center">Status</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground px-8 py-5 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(userData?.data?.data || []).map((user: IUser, idx: number) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-royal-gold/5 hover:bg-royal-gold/5 transition-colors group"
                    >
                      <TableCell className="px-8 py-5">
                         <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-royal-gold/10 flex items-center justify-center text-royal-gold font-bold text-xs border border-royal-gold/20 group-hover:bg-royal-gold/20 transition-colors">
                               {user.name.charAt(0).toUpperCase()}
                            </div>
                            <p className="text-sm font-bold text-foreground group-hover:text-royal-gold transition-colors">{user.name}</p>
                         </div>
                      </TableCell>
                      
                      <TableCell className="px-8 py-5">
                         <p className="text-xs font-medium text-foreground">{user.email}</p>
                         <p className="text-[10px] text-muted-foreground mt-0.5">{user.phone || 'No phone recorded'}</p>
                      </TableCell>

                      <TableCell className="px-8 py-5 text-center">
                        <Badge variant="outline" className="text-[9px] uppercase tracking-widest px-2 py-0.5 border-royal-gold/20 text-royal-gold bg-royal-gold/5">
                           {user.role}
                        </Badge>
                      </TableCell>

                      <TableCell className="px-8 py-5 text-center">
                        <Badge
                          variant="outline"
                          className={`text-[9px] uppercase tracking-widest px-2 py-0.5 ${
                            user?.isDeleted
                              ? 'border-rose-500/30 text-rose-500 bg-rose-500/5'
                              : 'border-emerald-500/30 text-emerald-600 bg-emerald-500/5'
                          }`}
                        >
                          {user?.isDeleted ? 'Forbidden' : 'Authorized'}
                        </Badge>
                      </TableCell>

                      <TableCell className="px-8 py-5 text-right">
                         <div className="flex justify-end gap-2">
                            <button className="text-muted-foreground hover:text-royal-gold transition-colors p-2">
                               <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-muted-foreground hover:text-rose-400 transition-colors p-2">
                               <Trash2 className="w-4 h-4" />
                            </button>
                         </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center">
        <Pagination
          page={page}
          totalPages={Math.ceil(total / limit)}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
