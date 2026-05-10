// ====================================================
// 📅 LargeScreenCalendar Component – Premium Visual Calendar
// ====================================================

'use client';

import React from 'react';
import {
  format,
  isSameDay,
  isBefore,
  isAfter,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  eachDayOfInterval,
  isValid,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ========== 🧾 Types ==========
type DateRange = {
  from?: Date;
  to?: Date;
};

interface CustomCalendarProps {
  bookedDates: string[]; // Expects array of formatted date strings: 'yyyy-MM-dd'
  selectedRange: DateRange;
  onSelectDate: (date: Date) => void;
}

// ========== 📆 CustomCalendar ==========
export default function LargeScreenCalendar({
  bookedDates,
  selectedRange,
  onSelectDate,
}: CustomCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  const today = new Date();
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // ========== ❌ Is Date Booked ==========
  const isDateBooked = (date: Date) => {
    if (!isValid(date)) return false;
    return bookedDates.includes(format(date, 'yyyy-MM-dd'));
  };

  // ========== 🟡 Is In Selected Range ==========
  const isInRange = (date: Date) => {
    if (!selectedRange.from || !selectedRange.to) return false;
    return (
      (isAfter(date, selectedRange.from) ||
        isSameDay(date, selectedRange.from)) &&
      (isBefore(date, selectedRange.to) || isSameDay(date, selectedRange.to))
    );
  };

  // ========== 🔒 Disable Logic ==========
  const disabled = (date: Date) =>
    isBefore(date, new Date(today.setHours(0, 0, 0, 0))) || isDateBooked(date);

  // ========== ⬅️➡️ Month Navigation ==========
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  return (
    <div className="w-full">
      {/* ========== 📅 Header: Month Navigation ========== */}
      <div className="flex justify-between items-center mb-10 text-foreground">
        <button
          aria-label="Previous month"
          onClick={prevMonth}
          className="p-2 text-royal-gold border border-royal-gold/20 hover:border-royal-gold transition-all"
          type="button"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="text-2xl font-serif font-bold text-foreground capitalize tracking-wide">
          {format(currentMonth, 'MMMM')} <span className="text-royal-gold italic">{format(currentMonth, 'yyyy')}</span>
        </div>
        <button
          aria-label="Next month"
          onClick={nextMonth}
          className="p-2 text-royal-gold border border-royal-gold/20 hover:border-royal-gold transition-all"
          type="button"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ========== 🗓️ Weekday Headers ========== */}
      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="royal-label !text-[9px] py-2 border-b border-royal-gold/10 opacity-60">
            {day}
          </div>
        ))}
      </div>

      {/* ========== 📆 Calendar Days ========== */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty start cells */}
        {Array(monthStart.getDay())
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} className="h-12" />
          ))}

        {days.map((date) => {
          const isDisabled = disabled(date);
          const isSelected =
            (selectedRange.from && isSameDay(date, selectedRange.from)) ||
            (selectedRange.to && isSameDay(date, selectedRange.to));
          const inRange = isInRange(date);
          const isToday = isSameDay(date, today);

          return (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => !isDisabled && onSelectDate(date)}
              disabled={isDisabled}
              aria-label={format(date, 'PPP')}
              className={`h-12 flex items-center justify-center text-xs font-bold transition-all relative border
                ${
                  isDisabled
                    ? 'bg-red-500/10 text-red-500/30 cursor-not-allowed border-transparent'
                    : isSelected
                      ? 'bg-royal-gold text-royal-blue border-royal-gold shadow-[0_0_15px_rgba(197,160,33,0.3)]'
                      : inRange
                        ? 'bg-royal-gold/20 text-royal-gold border-royal-gold/30'
                        : 'hover:bg-royal-gold hover:text-royal-blue text-foreground/80 border-white/5'
                }
                ${isToday && !isSelected ? 'border-royal-gold/50' : ''}
              `}
            >
              {date.getDate()}
              {isToday && !isSelected && (
                <div className="absolute top-1 right-1 w-1 h-1 bg-royal-gold rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* ========== 🧾 Legend ========== */}
      <div className="mt-8 flex flex-wrap gap-6 pt-6 border-t border-royal-gold/10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-royal-gold" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/60">Selected Date</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-royal-gold/20 border border-royal-gold/30" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/60">Stay Range</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500/20" />
          <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/60">Unavailable</span>
        </div>
      </div>
    </div>
  );
}
