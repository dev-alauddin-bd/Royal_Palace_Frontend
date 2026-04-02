// ====================================================
// 🧾  Receptionist Bookings Page Component
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Eye, Edit, Trash2, X } from 'lucide-react';
import { useGetAllBookingsQuery } from '@/redux/features/booking/bookingApi';

// ===== 🔹 Type Definitions =====

interface Room {
  _id: string;
  roomId: {
    title: string;
  };
  checkInDate: string;
  checkOutDate: string;
}

interface Booking {
  _id: string;
  name: string;
  guest: string;
  email: string;
  rooms: Room[];
  totalAmount: number;
  bookingStatus: string;
  status: string;
}

// ===== 🔁 ReceptionistBookingsPage Component =====

export default function ReceptionistBookingsPage() {
  // ===== 🔹 State variables =====
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);

  // ===== 🔹 Fetch bookings with applied filters =====
  const { data: bookingData, isLoading: bookingLoading } =
    useGetAllBookingsQuery({
      searchTerm,
      status: statusFilter === 'all' ? '' : statusFilter,
    });

  // ===== 🔁 Open modal and set selected rooms =====
  const openRoomsModal = (rooms: Room[]) => {
    setSelectedRooms(rooms);
    setModalOpen(true);
  };

  // ===== 🔁 Close modal and clear selected rooms =====
  const closeModal = () => {
    setModalOpen(false);
    setSelectedRooms([]);
  };

  return (
    <div className="space-y-6 p-4 min-h-screen">
      {/* ===== 🔹 Page Title ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-foreground">
          Booking Management
        </h1>
      </div>

      {/* ===== 🔹 Filters Section ===== */}
      <Card className="bg-main border rounded-md">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* 🔍 Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-foreground" />
              <Input
                placeholder="Search bookings..."
                className="pl-10 bg-main border text-foreground rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* 🔽 Status Filter Select */}
            <Select
              onValueChange={(value) => setStatusFilter(value)}
              defaultValue="all"
            >
              <SelectTrigger className="w-full sm:w-48 bg-main border text-foreground rounded-md">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-main border">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ===== 🔹 Bookings Table Section ===== */}
      <Card className="bg-main border rounded-md">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {bookingLoading ? (
            <p className="text-foreground p-6">Loading...</p>
          ) : bookingData?.data?.length === 0 ? (
            <p className="text-foreground p-6">No bookings found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="border-b">
                    <TableHead className="text-foreground">Name</TableHead>
                    <TableHead className="text-foreground">Guest</TableHead>
                    <TableHead className="text-foreground">Rooms</TableHead>
                    <TableHead className="text-foreground">Amount</TableHead>
                    <TableHead className="text-foreground">Status</TableHead>
                    <TableHead className="text-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingData?.data?.map((booking: Booking) => (
                    <TableRow
                      key={booking._id}
                      className="border-b hover:bg-[#2a2d38] transition"
                    >
                      {/* 🧾 Booking Name */}
                      <TableCell className="font-medium text-foreground">
                        {booking.name}
                      </TableCell>

                      {/* 🧾 Guest Name and Email */}
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">
                            {booking.guest}
                          </p>
                          <p className="text-sm text-foreground truncate max-w-xs">
                            {booking.email}
                          </p>
                        </div>
                      </TableCell>

                      {/* 🔍 Rooms count button triggers modal */}
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-foreground hover:bg-[#2a2d38]"
                          onClick={() => openRoomsModal(booking.rooms)}
                        >
                          {booking.rooms.length} Room
                          {booking.rooms.length > 1 ? 's' : ''}
                        </Button>
                      </TableCell>

                      {/* 🧾 Total Amount */}
                      <TableCell className="font-semibold text-amber-400">
                        ${booking.totalAmount.toFixed(2)}
                      </TableCell>

                      {/* 🧾 Booking Status Badge */}
                      <TableCell>
                        <Badge
                          variant={
                            booking.bookingStatus.toLowerCase() === 'booked'
                              ? 'default'
                              : booking.bookingStatus.toLowerCase() ===
                                  'pending'
                                ? 'secondary'
                                : 'outline'
                          }
                          className={
                            booking.bookingStatus.toLowerCase() === 'booked'
                              ? 'bg-emerald-600 hover:bg-emerald-700'
                              : booking.bookingStatus.toLowerCase() ===
                                  'pending'
                                ? 'bg-amber-600 hover:bg-amber-700'
                                : 'bg-blue-600 hover:bg-blue-700'
                          }
                        >
                          {booking.bookingStatus.charAt(0).toUpperCase() +
                            booking.bookingStatus.slice(1)}
                        </Badge>
                      </TableCell>

                      {/* 🔁 Action Buttons: View, Edit, Delete */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-foreground hover:text-foreground hover:bg-[#2a2d38]"
                            title="View"
                          >
                            <Eye className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-foreground hover:text-foreground hover:bg-[#2a2d38]"
                            title="Edit"
                          >
                            <Edit className="h-5 w-5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:text-red-300 hover:bg-[#2a2d38] text-accent-foreground"
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
            </div>
          )}
        </CardContent>
      </Card>

      {/* ===== 🔹 Modal: Room Details ===== */}
      {modalOpen && (
        <div className="fixed inset-0 bg-main bg-opacity-70 flex justify-center items-center p-4 z-50">
          <div className="bg-main rounded-md max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-lg relative">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold text-foreground">
                Room Details
              </h3>
              <button
                className="text-foreground hover:text-foreground"
                onClick={closeModal}
                aria-label="Close Modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              {selectedRooms.length === 0 ? (
                <p className="text-foreground">No rooms available</p>
              ) : (
                selectedRooms.map((room) => (
                  <div key={room._id} className="border rounded-md p-3">
                    <h4 className="font-semibold text-lg text-foreground">
                      {room.roomId.title}
                    </h4>
                    <p className="text-foreground text-sm">
                      Check-in:{' '}
                      <span className="font-medium">{room.checkInDate}</span>
                    </p>
                    <p className="text-foreground text-sm">
                      Check-out:{' '}
                      <span className="font-medium">{room.checkOutDate}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
