// ====================================================
// 🧾 AdminUsersPage Component — User Management Interface
// ====================================================

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

import { Search, Eye, Edit, Trash2 } from 'lucide-react';
import { useGetUsersQuery } from '@/redux/features/auth/authApi';
import Pagination from '@/components/shared/pagination';
import { IUser } from '@/types/auth.interface';

export default function AdminUsersPage() {
  // 🟡 State: Search term entered by user for filtering users
  const [searchTerm, setSearchTerm] = useState('');

  // 🟡 State: Current page number for pagination
  const [page, setPage] = useState(1);

  // 📏 Constant: Number of users per page
  const limit = 10;

  // 🔄 Data Fetch: Fetch users with given searchTerm, page, and limit using RTK Query
  const { data: userData, isLoading } = useGetUsersQuery({
    searchTerm,
    page,
    limit,
  });

  // 🔢 Total users count from fetched data, fallback to 1 to avoid division errors
  const total = userData?.meta?.total || 1;

  return (
    <div className="space-y-6 p-4 min-h-screen">
      {/* ===== Page Header ===== */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
      </div>

      {/* ===== Search Input Section ===== */}
      <Card className="bg-main border rounded-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-10 bg-main border text-foreground rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===== Users Table Section ===== */}
      <Card className="bg-main border rounded-md">
        <CardHeader>
          <CardTitle className="text-foreground">All Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          {/* Loading state */}
          {isLoading ? (
            <p className="text-foreground p-6">Loading...</p>
          ) : /* Empty state when no users found */
          userData?.data?.length === 0 ? (
            <p className="text-foreground p-6">No users found.</p>
          ) : (
            <Table className="min-w-[700px] w-full">
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="text-foreground">Name</TableHead>
                  <TableHead className="text-foreground">Email</TableHead>
                  <TableHead className="text-foreground">Phone</TableHead>
                  <TableHead className="text-foreground">Role</TableHead>
                  <TableHead className="text-foreground">Is Deleted</TableHead>
                  <TableHead className="text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Render each user row */}
                {userData?.data?.map((user: IUser) => (
                  <TableRow
                    key={user._id}
                    className="border-b hover:bg-[#2a2d38] transition"
                  >
                    <TableCell className="font-medium text-foreground">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell className="text-foreground">
                      {user.phone}
                    </TableCell>
                    <TableCell className="text-foreground capitalize">
                      {user.role}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user?.isDeleted
                            ? 'bg-emerald-600 hover:bg-emerald-700'
                            : 'bg-red-600 hover:bg-red-700'
                        }
                      >
                        {user?.isDeleted ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* Action Buttons */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-foreground hover:bg-[#2a2d38]"
                          title="View"
                        >
                          <Eye className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-foreground hover:bg-[#2a2d38]"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:text-red-300 hover:bg-[#2a2d38]"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* ===== Pagination Controls ===== */}
      <Pagination
        page={page}
        totalPages={Math.ceil(total / limit)}
        setPage={setPage}
      />
    </div>
  );
}
