// --- RoomsPage.tsx ---
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Search, Bed } from 'lucide-react';
import RoomFormModal from '@/components/modal/room-form-modal';
import {
  useDeleteRoomMutation,
  useFindAllRoomsQuery,
} from '@/redux/features/room/room.api';
import toast, { Toaster } from 'react-hot-toast';
import { IRoom } from '@/types/room.interface';

export default function RoomsPage() {
  const { data: roomsData, isLoading } = useFindAllRoomsQuery(undefined);

  const [deleteRoom] = useDeleteRoomMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | undefined>(
    undefined,
  );

  /* ===== Handlers ===== */
  const handleOpenCreateModal = () => {
    setSelectedRoom(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (room: IRoom) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleDeleteRoom = async (id: string) => {
    try {
      await deleteRoom(id);
      toast.success('Room deleted successfully!');
    } catch {
      toast.error('Failed to delete room.');
    }
  };
  // === Loading State ===
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#bf9310] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#bf9310] font-semibold text-lg">
            Loading rooms...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* ===== Header and Add Room Button ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Room Management
          </h1>
        </div>
        <Button
          className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 font-medium"
          onClick={handleOpenCreateModal}
        >
          <Plus className="h-4 w-4 mr-2" /> Add Room
        </Button>
      </div>

      {/* ===== Filters ===== */}
      <Card className="bg-main">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground" />
              <Input
                placeholder="Search rooms..."
                className="pl-10 bg-main text-foreground"
              />
            </div>

            <Select>
              <SelectTrigger className="w-full sm:w-48 bg-main text-foreground">
                <SelectValue placeholder="Room Type" />
              </SelectTrigger>
              <SelectContent className="bg-main">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="suite">Suite</SelectItem>
                <SelectItem value="deluxe">Deluxe</SelectItem>
                <SelectItem value="twin">Twin</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full sm:w-48 bg-main text-foreground">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-main">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ===== Room Cards ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roomsData?.data?.map((room: IRoom) => (
          <Card
            key={room?._id}
            className="bg-main overflow-hidden p-0 flex flex-col"
          >
            {/* ===== Room Image ===== */}
            <div className="aspect-video relative">
              <img
                src={room.images?.[0] || '/placeholder.svg'}
                alt={room?.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* ===== Room Header ===== */}
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-foreground text-lg">
                    {room.title}
                  </CardTitle>
                  <p className="text-foreground text-sm">
                    {room.type} • Room {room.roomNumber}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-amber-400">
                    ${room.price}
                  </p>
                  <p className="text-xs text-foreground">per night</p>
                </div>
              </div>
            </CardHeader>

            {/* ===== Room Content ===== */}
            <CardContent className="flex flex-col flex-1 justify-between space-y-4">
              <div className="text-foreground flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Bed className="h-4 w-4" />
                  <span className="text-sm">{room?.type}</span>
                </div>
              </div>

              {/* ===== Features Section with Fixed Height ===== */}
              <div className="flex flex-wrap gap-2 min-h-[40px] max-h-[60px] overflow-hidden">
                {room.features.slice(0, 3).map((feature) => (
                  <Badge
                    key={feature}
                    variant="secondary"
                    className="text-foreground text-xs"
                  >
                    {feature}
                  </Badge>
                ))}
                {room.features.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="text-foreground text-xs"
                  >
                    +{room.features.length - 3} more
                  </Badge>
                )}
              </div>

              {/* ===== Action Buttons ===== */}
              <div className="flex gap-2 mt-auto pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-foreground"
                  onClick={() => handleOpenEditModal(room)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-foreground"
                >
                  View Details
                </Button>
                <Button
                  onClick={() => handleDeleteRoom(room?._id)}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-foreground hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ===== Room Form Modal ===== */}
      <RoomFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
      />

      {/* ===== Toast Notifications ===== */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </div>
  );
}
