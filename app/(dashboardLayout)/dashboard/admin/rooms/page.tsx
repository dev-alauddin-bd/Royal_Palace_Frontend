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
import { Plus, Search, Bed, LayoutGrid, Trash2, Edit3, MoreHorizontal } from 'lucide-react';
import RoomFormModal from '@/components/modal/room-form-modal';
import {
  useDeleteRoomMutation,
  useFindAllRoomsQuery,
} from '@/redux/features/room/room.api';
import toast, { Toaster } from 'react-hot-toast';
import { IRoom } from '@/types/room.interface';
import Loader from '@/components/shared/Loader';
import DashboardSectionHeader from '@/components/dashboard/DashboardSectionHeader';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function RoomsPage() {
  const { data: roomsData, isLoading } = useFindAllRoomsQuery(undefined);

  const [deleteRoom] = useDeleteRoomMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<IRoom | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const rooms = roomsData?.data?.data || [];
  
  const filteredRooms = rooms.filter((room: IRoom) => {
    const matchesSearch = (room.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (room.roomNumber || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || room.type?.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || room.roomStatus?.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleOpenCreateModal = () => {
    setSelectedRoom(undefined);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (room: IRoom) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleDeleteRoom = async (id: string) => {
    if (!confirm('Are you sure you wish to remove this suite from the heritage collection?')) return;
    try {
      await deleteRoom(id);
      toast.success('Room removed from the collection');
    } catch {
      toast.error('Failed to remove room.');
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 md:p-8 space-y-8">
      {/* ===== Header Section ===== */}
      <DashboardSectionHeader 
        title="Manage Rooms"
        subtitle="Manage and update the collection of luxury rooms and suites."
        icon={Bed}
        rightElement={
          <button
            className="royal-button !h-12 group"
            onClick={handleOpenCreateModal}
          >
            <Plus className="h-4 w-4 mr-2" /> 
            ADD NEW SUITE
          </button>
        }
      />

      {/* ===== Search & Filter Bar ===== */}
      <div className="glass-panel p-6 border-royal-gold/10 flex flex-col md:flex-row gap-4 items-center shadow-sm dark:shadow-none">
        <div className="relative w-full flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-royal-gold" />
          <Input
            placeholder="Search by suite name or number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 bg-white/5 border-royal-gold/10 text-foreground placeholder:text-muted-foreground/30 focus:border-royal-gold/50 transition-all rounded-none ring-0 focus-visible:ring-0"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <Select onValueChange={setCategoryFilter} defaultValue="all">
            <SelectTrigger className="w-full md:w-48 h-12 bg-white/5 border-royal-gold/10 text-foreground rounded-none focus:ring-0">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-card border-royal-gold/20 rounded-none">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="luxury">Luxury Suites</SelectItem>
              <SelectItem value="suite">Presidential</SelectItem>
              <SelectItem value="deluxe">Executive Deluxe</SelectItem>
              <SelectItem value="twin">Twin Heritage</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={setStatusFilter} defaultValue="all">
            <SelectTrigger className="w-full md:w-48 h-12 bg-white/5 border-royal-gold/10 text-foreground rounded-none focus:ring-0">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-royal-gold/20 rounded-none">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ===== Room Inventory Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredRooms.map((room: IRoom, idx: number) => (
          <motion.div
            key={room?._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="glass-panel border-royal-gold/10 overflow-hidden group shadow-sm dark:shadow-none h-full flex flex-col p-0">
              {/* Room Image Area */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={room.images?.[0] || '/images/room-placeholder.webp'}
                  alt={room?.title || 'Suite'}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                <div className="absolute top-4 right-4">
                   <Badge className="bg-royal-gold text-royal-blue font-bold tracking-widest text-[8px] rounded-none px-3 py-1 uppercase">
                     {room.type}
                   </Badge>
                   <Badge className={`ml-2 font-bold tracking-widest text-[8px] rounded-none px-3 py-1 uppercase ${room.roomStatus === 'active' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                     {room.roomStatus}
                   </Badge>
                </div>
                <div className="absolute bottom-4 left-6">
                   <p className="text-white font-[var(--font-cinzel)] font-bold text-2xl tracking-tight">${room.price}<span className="text-[10px] uppercase font-medium tracking-widest opacity-60 ml-2">per night</span></p>
                </div>
              </div>

              {/* Room Info */}
              <CardContent className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-[var(--font-cinzel)] font-bold text-foreground">
                      {room.title}
                    </h4>
                    <span className="text-[10px] font-bold text-royal-gold uppercase tracking-[0.2em]">Suite {room.roomNumber}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {room.features.slice(0, 3).map((feature) => (
                      <span
                        key={feature}
                        className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground border border-royal-gold/10 px-2 py-1 bg-royal-gold/5"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 mt-8 pt-6 border-t border-royal-gold/5">
                  <button
                    onClick={() => handleOpenEditModal(room)}
                    className="flex items-center justify-center gap-2 h-11 text-[10px] font-bold uppercase tracking-widest border border-royal-gold/20 hover:bg-royal-gold/10 text-foreground transition-all"
                  >
                    <Edit3 className="w-3 h-3" /> Edit Details
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room?._id)}
                    className="flex items-center justify-center gap-2 h-11 text-[10px] font-bold uppercase tracking-widest border border-red-500/20 hover:bg-red-500/10 text-red-400 transition-all"
                  >
                    <Trash2 className="w-3 h-3" /> Remove Suite
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <RoomFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        room={selectedRoom}
      />

      <Toaster position="top-right" />
    </div>
  );
}
