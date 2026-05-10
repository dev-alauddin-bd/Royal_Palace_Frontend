// ====================================================
// 📅 DateRangeCalendar Component – Select check-in/out dates, add to cart or book
// ====================================================

'use client';

import React, { useState } from 'react';
import { format, differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { CalendarDays, Clock, Moon, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { addCartItem } from '@/redux/features/cart/cartSlice';
import { useAppDispatch } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useRouter } from 'next/navigation';

import toast, { Toaster } from 'react-hot-toast';
import { useGetBookedDatesQuery } from '@/redux/features/booking/bookingApi';
import LargeScreenCalendar from './large-screen-view-calender';
import SmallScreenCalendar from './small-screen-view-calender';

// ========== 🧾 Types ========== //
type DateRange = {
  from?: Date;
  to?: Date;
};

interface Room {
  _id: string;
  name?: string;
  images?: string[];
  price?: number;
  description?: string;
  features?: string[];
}

interface DateRangeCalendarProps {
  room: Room;
}

export default function DateRangeCalendarSection({
  room,
}: DateRangeCalendarProps) {
  // ========== 🖼️ State ========== //
  const [mainImage] = useState(room?.images?.[0] || '/placeholder.svg');
  const user = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [selectedRange, setSelectedRange] = useState<DateRange>({});
  const router = useRouter();

  // ========== 📡 Fetch Booked Dates ========== //
  const { data: bookingData, isLoading } = useGetBookedDatesQuery(room._id);
  const bookedDates =
    bookingData?.filter((d: any) => typeof d === 'string' && d.trim()) || [];

  // ========== 📅 Date Selection Logic ========== //
  const handleSelectDate = (date: Date) => {
    if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
      setSelectedRange({ from: date, to: undefined });
    } else {
      if (date < selectedRange.from) {
        setSelectedRange({ from: date, to: undefined });
      } else {
        // Check if any date in the range is already booked
        const range = eachDayOfInterval({ start: selectedRange.from, end: date });
        const hasBookedDate = range.some((d) => 
          bookedDates.includes(format(d, 'yyyy-MM-dd'))
        );

        if (hasBookedDate) {
          toast.error('The selected range contains unavailable dates.');
          setSelectedRange({ from: date, to: undefined });
          return;
        }

        setSelectedRange({ from: selectedRange.from, to: date });
      }
    }
  };

  const isSameDay = () =>
    selectedRange.from &&
    selectedRange.to &&
    format(selectedRange.from, 'yyyy-MM-dd') ===
      format(selectedRange.to, 'yyyy-MM-dd');

  const numberOfNights =
    selectedRange.from && selectedRange.to
      ? differenceInCalendarDays(selectedRange.to, selectedRange.from)
      : 0;

  // ========== ➕ Add to Cart ========== //
  const handleAddToCart = () => {
    if (!selectedRange.from || !selectedRange.to) {
      toast.error('Please select both check-in and check-out dates.');
      return;
    }
    if (isSameDay()) {
      toast.error('Check-in and check-out cannot be on the same day.');
      return;
    }

    dispatch(
      addCartItem({
        userId: user!._id,
        room: {
          roomId: room._id,
          name: room.name,
          checkInDate: format(selectedRange.from, 'yyyy-MM-dd'),
          checkOutDate: format(selectedRange.to, 'yyyy-MM-dd'),
          image: mainImage,
          price: room?.price,
        },
      }),
    );
    toast.success('Added to cart!');
  };

  // ========== ✅ Book Now ========== //
  const handleBookNow = () => {
    if (!selectedRange.from || !selectedRange.to) {
      toast.error('Please select both check-in and check-out dates.');
      return;
    }
    if (isSameDay()) {
      toast.error('Check-in and check-out cannot be on the same day.');
      return;
    }

    dispatch(
      addCartItem({
        userId: user!._id,
        room: {
          roomId: room._id,
          name: room.name,
          checkInDate: format(selectedRange.from, 'yyyy-MM-dd'),
          checkOutDate: format(selectedRange.to, 'yyyy-MM-dd'),
          image: mainImage,
          price: room?.price,
        },
      }),
    );
    router.push('/checkout');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ===== 🖥️ Desktop Calendar View ===== */}
      <Card className="bg-royal-obsidian/5 border border-royal-gold/10 rounded-none overflow-hidden">
        <CardHeader className="border-b border-royal-gold/10">
          <CardTitle className="text-foreground flex items-center gap-4">
            <CalendarDays className="w-5 h-5 text-royal-gold" />
            <span className="royal-label">Select Your Dates</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-64 flex items-center justify-center text-foreground">
              Loading available dates...
            </div>
          ) : (
            <LargeScreenCalendar
              bookedDates={bookedDates}
              selectedRange={selectedRange}
              onSelectDate={handleSelectDate}
            />
          )}
        </CardContent>
      </Card>

      {/* ===== 📱 Mobile Calendar View ===== */}
      <div className="block sm:hidden">
        <SmallScreenCalendar
          selectedRange={selectedRange}
          bookedDates={bookedDates}
          onSelectDate={handleSelectDate}
        />
        {selectedRange.from && (
          <p className="mt-2 text-sm text-foreground">
            Selected date: {format(selectedRange.from, 'PPP')}
          </p>
        )}
      </div>

      {/* ===== 🧾 Booking Summary ===== */}
      <Card className="bg-royal-obsidian/5 border border-royal-gold/10 rounded-none flex flex-col h-full">
        <CardHeader className="flex flex-col md:flex-row items-center justify-between border-b border-royal-gold/10">
          <CardTitle className="royal-label">Reservation Summary</CardTitle>
          <p className="text-xs text-center flex justify-center items-center gap-3 uppercase tracking-widest font-bold text-royal-gold">
            <Moon className="w-4 h-4" />
            <span>
              {numberOfNights} night{numberOfNights > 1 ? 's' : ''} stay
            </span>
          </p>
        </CardHeader>

        <CardContent className="flex flex-col justify-between flex-grow space-y-6">
          {selectedRange.from && selectedRange.to ? (
            <>
              {/* 🗓️ Check-in / Check-out Info */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="royal-label !text-[10px] mb-3 block">Check-in</label>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-none text-white">
                      <div className="text-lg font-serif italic mb-1">{format(selectedRange.from, 'MMM dd, yyyy')}</div>
                      <div className="text-royal-gold text-[10px] flex items-center gap-2 uppercase tracking-widest font-bold">
                        <Clock className="w-3 h-3" /> 15:00 HRS
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="royal-label !text-[10px] mb-3 block">Check-out</label>
                    <div className="p-5 bg-white/5 border border-white/10 rounded-none text-white">
                      <div className="text-lg font-serif italic mb-1">{format(selectedRange.to, 'MMM dd, yyyy')}</div>
                      <div className="text-royal-gold text-[10px] flex items-center gap-2 uppercase tracking-widest font-bold">
                        <Clock className="w-3 h-3" /> 11:00 HRS
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 🧾 Action Buttons */}
              <div className="flex flex-col gap-4 pt-8">
                <button
                  onClick={handleBookNow}
                  className="royal-button-solid w-full"
                >
                  RESERVE NOW
                </button>
                <button
                  onClick={handleAddToCart}
                  className="royal-button w-full"
                >
                  <ShoppingCart className="w-4 h-4 mr-3" />
                  ADD TO CONCIERGE
                </button>
              </div>
            </>
          ) : (
            // ❗ Message when no dates selected
            <div className="text-center py-12 flex-1 flex flex-col justify-center items-center">
              <div className="w-16 h-16 border border-royal-gold/20 flex items-center justify-center mb-6">
                <CalendarDays className="w-6 h-6 text-royal-gold/40" />
              </div>
              <h4 className="royal-label !text-[10px] mb-2">Dates Required</h4>
              <p className="text-foreground/40 text-xs max-w-[200px] mx-auto uppercase tracking-widest leading-relaxed">
                Please select your check-in and check-out dates to view availability.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 🔔 Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
