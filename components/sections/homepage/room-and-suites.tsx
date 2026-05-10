'use client';

import { motion } from 'framer-motion';
import { Card } from '../../ui/card';
import { Bed, Home, Star, Users, ArrowRight } from 'lucide-react';
import { Button } from '../../ui/button';
import { useFilterAllRoomsQuery } from '@/redux/features/room/room.api';
import Image from 'next/image';
import type { IRoom } from '@/types/room.interface';
import Link from 'next/link';

const RoomAndSuites = () => {
  const { data: roomsData } = useFilterAllRoomsQuery({ limit: 6 });

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* ===== Section Header ===== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          {/* Title Decoration */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-royal-gold/20 w-32 mr-6"></div>
            <div className="flex items-center">
              <Bed className="w-5 h-5 text-royal-gold mr-4" />
              <h2 className="royal-label">
                Hotel Rooms & Suites
              </h2>
              <Bed className="w-5 h-5 text-royal-gold ml-4" />
            </div>
            <div className="h-px bg-royal-gold/20 w-32 ml-6"></div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-center max-w-4xl mx-auto text-foreground">
            Selection of <br />
            <span className="text-royal-gold italic">Luxury Accommodations</span>
          </h1>
        </motion.div>

        {/* ===== Rooms Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {roomsData?.data?.data?.map((room: IRoom, index: number) => (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group relative w-full overflow-hidden bg-white dark:bg-royal-obsidian border-royal-gold/10 rounded-none p-0 transform transition-all duration-700 hover:border-royal-gold/40 shadow-xl">
                {/* Background Image */}
                <div className="relative h-[480px] overflow-hidden">
                  <Image
                    src={room.images && room.images[0] ? room.images[0] : '/placeholder.svg'}
                    alt={room.title || 'Luxury hotel room'}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-obsidian via-royal-obsidian/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Room Number */}
                  <div className="absolute top-8 left-8">
                    <div className="text-5xl font-serif font-light text-white/10 group-hover:text-royal-gold/30 transition-colors duration-500 tracking-tighter">
                      {room.roomNumber}
                    </div>
                  </div>

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

                    {/* Amenities */}
                    <div className="flex gap-8 text-[9px] uppercase tracking-[0.25em] font-bold text-white/60 mb-10 border-t border-white/10 pt-6">
                      <div className="flex items-center gap-3">
                        <Bed className="w-3.5 h-3.5 text-royal-gold" />
                        <span>King Bed</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-3.5 h-3.5 text-royal-gold" />
                        <span>2 Guests</span>
                      </div>
                    </div>

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
        </div>
      </div>
    </section>
  );
};

export default RoomAndSuites;
