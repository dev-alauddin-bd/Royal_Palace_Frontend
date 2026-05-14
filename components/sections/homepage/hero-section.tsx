'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Krona_One } from 'next/font/google';

const HeroSection = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (checkIn) params.append('checkInDate', checkIn);
    if (checkOut) params.append('checkOutDate', checkOut);
    params.append('adults', String(adults));
    params.append('children', String(children));

    router.push(`/rooms?${params.toString()}`);
  };

  return (
    <section className="relative h-[75vh] min-h-[550px] w-full overflow-hidden">
      {/* 🌄 Background image */}
      <Image
        src="/images/Hero-Banner.webp"
        alt="Luxury Resort"
        fill
        className="object-cover z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* 📦 Content Center */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white font-[var(--font-cinzel)] font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 tracking-tight"
        >
          Experience the Finest <br />
          <span className="text-royal-gold italic">Royal Hospitality</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-white/90 text-xs sm:text-sm md:text-base max-w-2xl mb-10 font-medium tracking-[0.2em] uppercase"
        >
          Discover why thousands choose us for their perfect getaway. <br className="hidden md:block" />
          Your comfort is our greatest legacy.
        </motion.p>

        {/* 📅 Booking Form */}
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="glass-panel p-6 rounded-none border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl text-white relative"
        >
          {/* Decorative Corner */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-royal-gold"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-royal-gold"></div>

          {/* Check-in */}
          <div className="flex flex-col items-start">
            <label htmlFor="checkIn" className="royal-label mb-2">
              Check-in
            </label>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full h-11 bg-white/5 border border-white/10 px-4 text-xs text-white placeholder:text-white/40 focus:border-royal-gold transition-colors outline-none rounded-none uppercase tracking-widest"
              required
            />
          </div>

          {/* Check-out */}
          <div className="flex flex-col items-start">
            <label htmlFor="checkOut" className="royal-label mb-2">
              Check-out
            </label>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full h-11 bg-white/5 border border-white/10 px-4 text-xs text-white focus:border-royal-gold transition-colors outline-none rounded-none uppercase tracking-widest"
              required
            />
          </div>

          {/* Adults */}
          <div className="flex flex-col items-start">
            <label className="royal-label mb-2">Adults</label>
            <div className="flex items-center w-full bg-white/5 border border-white/10 h-11">
              <button
                type="button"
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-11 h-full flex items-center justify-center text-royal-gold hover:bg-white/5 transition-colors border-r border-white/10"
              >
                -
              </button>
              <div className="flex-1 text-center text-[10px] font-bold tracking-widest">
                {adults} {adults === 1 ? 'ADULT' : 'ADULTS'}
              </div>
              <button
                type="button"
                onClick={() => setAdults(Math.min(10, adults + 1))}
                className="w-11 h-full flex items-center justify-center text-royal-gold hover:bg-white/5 transition-colors border-l border-white/10"
              >
                +
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex flex-col items-start">
            <label className="royal-label mb-2">Children</label>
            <div className="flex items-center w-full bg-white/5 border border-white/10 h-11">
              <button
                type="button"
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-11 h-full flex items-center justify-center text-royal-gold hover:bg-white/5 transition-colors border-r border-white/10"
              >
                -
              </button>
              <div className="flex-1 text-center text-[10px] font-bold tracking-widest">
                {children} {children === 1 ? 'CHILD' : 'CHILDREN'}
              </div>
              <button
                type="button"
                onClick={() => setChildren(Math.min(10, children + 1))}
                className="w-11 h-full flex items-center justify-center text-royal-gold hover:bg-white/5 transition-colors border-l border-white/10"
              >
                +
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="sm:col-span-2 md:col-span-4 royal-button flex justify-center items-center mt-2 h-11"
          >
            <CalendarDays className="w-5 h-5 mr-3" />
            CHECK AVAILABILITY
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default HeroSection;
