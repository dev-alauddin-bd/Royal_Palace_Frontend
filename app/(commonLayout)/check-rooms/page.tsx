'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight, Bed } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFilterAllRoomsQuery } from '@/redux/features/room/room.api';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/shared/pagination';

interface IRoom {
  _id: string;
  title: string;
  type: string;
  price: number;
  images: string[];
}

// === Available Room Types ===
const roomTypes = ['all', 'luxury', 'suite', 'deluxe', 'twine'];

export default function CheckRooms() {
  const [tab, setTab] = useState('all');

  const [page, setPage] = useState(1);

  const [queryParams, setQueryParams] = useState({
    checkInDate: '',
    checkOutDate: '',
    adults: 1,
    children: 0,
  });

  // === Extract search query params from URL ===
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setQueryParams({
        checkInDate: params.get('checkInDate') || '',
        checkOutDate: params.get('checkOutDate') || '',
        adults: Number(params.get('adults') || 1),
        children: Number(params.get('children') || 0),
      });
    }
  }, []);

  // === Fetch filtered room data ===
  const { data, isLoading } = useFilterAllRoomsQuery(
    {
      checkInDate: queryParams.checkInDate,
      checkOutDate: queryParams.checkOutDate,
      adults: queryParams.adults,
      children: queryParams.children,
      type: tab === 'all' ? undefined : tab,
      limit: 6,
      page,
    },
    {
      skip: !queryParams.checkInDate || !queryParams.checkOutDate,
    },
  );

  const rooms = data?.data?.data || [];
  const totalPages = data?.meta?.total || 1;

  // === Handlers ===
  const onTabChange = (newTab: string) => {
    setTab(newTab);
    setPage(1);
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
    <div className="min-h-screen container mx-auto px-4 py-8 md:py-12">
      {/* ===== Title Section with Animation ===== */}
      <motion.div
        className="flex items-center justify-center px-4 text-center flex-wrap mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-20 sm:w-32 mr-4" />
        <div className="flex items-center justify-center">
          <Bed className="w-5 h-5 sm:w-6 sm:h-6 title mr-2" />
          <h2 className="title text-base sm:text-lg md:text-xl font-medium tracking-[0.2em] uppercase">
            Check Rooms
          </h2>
          <Bed className="w-5 h-5 sm:w-6 sm:h-6 title ml-2" />
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-20 sm:w-32 ml-4" />
      </motion.div>
      {/* === Room Filter Controls === */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        {/* Mobile Dropdown */}
        <select
          value={tab}
          onChange={(e) => onTabChange(e.target.value)}
          className="block md:hidden w-full border rounded px-4 py-2 bg-[#191a1e] text-white text-sm"
        >
          {roomTypes.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>

        {/* Desktop Tabs */}
        <Tabs
          value={tab}
          onValueChange={onTabChange}
          className="hidden md:block"
        >
          <TabsList className="flex-wrap justify-center md:justify-start">
            {roomTypes.map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                className="capitalize text-sm md:text-base px-4 py-1"
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* === Room Cards Grid === */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="show"
      >
        {rooms.map((room: IRoom) => (
          <motion.div
            key={room._id}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Card className="group relative p-0 bg-black rounded-none overflow-hidden hover:scale-105 transition-transform duration-500">
              <div className="relative h-80 sm:h-96 overflow-hidden">
                <Image
                  src={room.images[0] || '/placeholder.svg'}
                  alt={room.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-500" />
                <div className="absolute top-4 right-4 bg-[#bf9310] text-white px-3 py-1 text-xs md:text-sm font-semibold">
                  ${room.price}/night
                </div>
                <div className="absolute bottom-6 left-6 text-white space-y-2 text-sm md:text-base">
                  <div className="font-light text-lg md:text-xl">
                    {room.title}
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-[#bf9310] text-[#bf9310]"
                      />
                    ))}
                  </div>
                  <Link href={`/rooms/${room._id}`}>
                    <Button
                      variant="outline"
                      className="mt-2 bg-transparent text-white border-white hover:bg-[#bf9310] hover:border-[#bf9310] rounded-none cursor-pointer"
                    >
                      VIEW DETAILS <ArrowRight className="w-4 h-4 inline" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== Pagination controls ===== */}
      <Pagination
        page={page}
        totalPages={totalPages} // your calculated value
        setPage={setPage}
      />
    </div>
  );
}
