'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const router = useRouter();

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert('Please select check-in and check-out dates.');
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert('Check-out date must be after check-in date.');
      return;
    }

    router.push(
      `/check-rooms?checkInDate=${checkIn}&checkOutDate=${checkOut}&adults=${adults}&children=${children}`,
    );
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 🌄 Background image */}
      <Image
        src="/images/Hero-Banner.webp"
        alt="Luxury Resort"
        fill
        className="object-cover z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* 📦 Content Center */}
      <div className="relative z-20 flex flex-col justify-center items-center h-full px-4 text-center">
    <motion.h1
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className="text-white font-serif font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
>
  Discover the Perfect Room
  <br />
  <span className="text-[#bf9310]">for Your Luxury Escape</span>
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="text-white text-base sm:text-lg md:text-xl max-w-2xl mb-10"
>
  From romantic getaways to family retreats — experience the comfort, elegance, and hospitality of our premium resort rooms.
</motion.p>

        {/* 📅 Booking Form */}
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="backdrop-blur-sm border border-white/20 bg-white/10 p-6 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl text-foreground"
        >
          {/* Check-in */}
          <div className="flex flex-col">
            <label htmlFor="checkIn" className="mb-1 font-semibold text-sm">
              Check-in
            </label>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="rounded-md bg-main border border-white/20 p-2 text-foreground placeholder:text-foreground/40"
              required
            />
          </div>

          {/* Check-out */}
          <div className="flex flex-col">
            <label htmlFor="checkOut" className="mb-1 font-semibold text-sm">
              Check-out
            </label>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="rounded-md bg-main border border-white/20 p-2 text-foreground"
              required
            />
          </div>

          {/* Adults */}
          <div className="flex flex-col">
            <label htmlFor="adults" className="mb-1 font-semibold text-sm">
              Adults
            </label>
            <select
              id="adults"
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value))}
              className="rounded-md bg-main border border-white/20 p-2 text-foreground"
            >
              {[...Array(4).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Children */}
          <div className="flex flex-col">
            <label htmlFor="children" className="mb-1 font-semibold text-sm">
              Children
            </label>
            <select
              id="children"
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value))}
              className="rounded-md bg-main border border-white/20 p-2 text-foreground"
            >
              {[...Array(4).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="sm:col-span-2 md:col-span-4 bg-[#bf9310] cursor-pointer hover:bg-yellow-600 text-black font-semibold py-3 rounded-md transition flex justify-center items-center"
          >
            <CalendarDays className="w-5 h-5 mr-2" />
            Available Rooms
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default HeroSection;
