'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight, Bed } from 'lucide-react';
import { useFilterAllRoomsQuery } from '@/redux/features/room/room.api';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/components/shared/pagination';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

interface IRoom {
  _id: string;
  title: string;
  type: string;
  price: number;
  images: string[];
}

const roomTypes = ['all', 'luxury', 'suite', 'deluxe', 'twine'];

// ===== Custom debounce hook =====
function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

// Separate component to use search params
function RoomsContent() {
  const [tab, setTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const searchParams = useSearchParams();
  const urlCheckIn = searchParams.get('checkInDate');
  const urlCheckOut = searchParams.get('checkOutDate');
  const urlAdults = searchParams.get('adults');
  const urlChildren = searchParams.get('children');

  const { data, isLoading } = useFilterAllRoomsQuery({
    searchTerm: debouncedSearchTerm,
    type: tab === 'all' ? undefined : tab,
    checkInDate: urlCheckIn || undefined,
    checkOutDate: urlCheckOut || undefined,
    adults: urlAdults ? Number(urlAdults) : undefined,
    children: urlChildren ? Number(urlChildren) : undefined,
    limit: 6,
    page,
  });

  const rooms = data?.data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const onTabChange = (newTab: string) => {
    setTab(newTab);
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-16 h-16 border-2 border-royal-gold border-t-transparent animate-spin" />
          <p className="text-royal-gold font-serif font-bold uppercase tracking-[0.3em] text-sm">
            Curating your experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 md:py-12">
      {/* ===== Title Section with Animation ===== */}
      <motion.div
        className="flex items-center justify-center px-4 text-center flex-wrap mb-16"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="h-px bg-royal-gold/20 w-20 sm:w-32 mr-6" />
        <div className="flex items-center justify-center">
          <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-royal-gold mr-4" />
          <h2 className="royal-label">
            Our Luxury Rooms
          </h2>
          <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-royal-gold ml-4" />
        </div>
        <div className="h-px bg-royal-gold/20 w-20 sm:w-32 ml-6" />
      </motion.div>

      {/* ===== Filter controls ===== */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 border-b border-royal-gold/10 pb-12">
        <select
          value={tab}
          onChange={(e) => onTabChange(e.target.value)}
          className="block md:hidden w-full border border-royal-gold/20 px-4 py-3 bg-royal-obsidian text-white text-xs uppercase tracking-widest outline-none focus:border-royal-gold transition-colors"
        >
          {roomTypes.map((t) => (
            <option key={t} value={t}>
              {t.toUpperCase()}
            </option>
          ))}
        </select>

        <Tabs
          value={tab}
          onValueChange={onTabChange}
          className="hidden md:block"
        >
          <TabsList className="bg-transparent border-none gap-6">
            {roomTypes.map((t) => (
              <TabsTrigger
                key={t}
                value={t}
                className="uppercase tracking-[0.3em] text-[10px] font-bold px-0 py-2 data-[state=active]:text-royal-gold data-[state=active]:border-b-2 data-[state=active]:border-royal-gold rounded-none transition-all"
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Input
          placeholder="SEARCH SUITES..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full md:w-80 bg-royal-obsidian/5 border-royal-gold/20 rounded-none h-12 text-[10px] tracking-widest placeholder:text-foreground/30 focus-visible:ring-0 focus-visible:border-royal-gold"
        />
      </div>

      {/* ===== Rooms Grid with Motion ===== */}
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
            <Card className="group relative w-full overflow-hidden bg-white dark:bg-royal-obsidian border-royal-gold/10 rounded-none p-0 transform transition-all duration-700 hover:border-royal-gold/40 shadow-xl">
              <div className="relative h-[480px] overflow-hidden">
                <Image
                  src={room.images[0] || '/placeholder.svg'}
                  alt={room.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-obsidian via-royal-obsidian/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Price Tag */}
                <div className="absolute top-8 right-8">
                  <div className="bg-royal-gold text-royal-blue px-6 py-2 font-serif font-bold text-[10px] tracking-[0.2em] uppercase">
                    ${room.price} / NIGHT
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-10 left-10 right-10 text-white z-10">
                  <div className="flex gap-1.5 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-royal-gold text-royal-gold"
                      />
                    ))}
                  </div>
                  
                  <h3 className="text-3xl font-serif font-bold mb-6 group-hover:text-royal-gold transition-colors duration-300 leading-tight">
                    {room.title}
                  </h3>

                  {/* Button */}
                  <Link href={`/rooms/${room._id}`} className="block">
                    <button
                      className="w-full royal-button flex items-center justify-center group/btn"
                    >
                      EXPLORE SUITE
                      <ArrowRight className="w-4 h-4 ml-3 transition-transform duration-500 group-hover/btn:translate-x-2" />
                    </button>
                  </Link>
                </div>

                {/* Decorative Frame */}
                <div className="absolute inset-5 border border-white/10 pointer-events-none group-hover:border-royal-gold/20 transition-colors duration-500" />
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== Pagination ===== */}
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default function RoomsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 border-2 border-royal-gold border-t-transparent animate-spin" />
      </div>
    }>
      <RoomsContent />
    </Suspense>
  );
}
