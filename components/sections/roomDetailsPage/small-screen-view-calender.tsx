// ====================================================
// 🗓️ SmallScreenCalendar Component – Premium Mobile View
// ====================================================

import React, { useState } from 'react';
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// ===== 🔹 Props & Weekdays ===== //
interface SimpleCalendarProps {
  onSelectDate: (date: Date) => void;
  selectedRange?: { from?: Date; to?: Date };
  bookedDates?: string[];
}

const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default function SmallScreenCalendar({
  onSelectDate,
  selectedRange,
  bookedDates = [],
}: SimpleCalendarProps) {
  // ===== 🔹 State Setup ===== //
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = [];
  let day = calendarStart;

  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  // ========== 🔁 Month Navigation Handlers ========== //
  const prevMonth = () => setCurrentMonth(addDays(monthStart, -1));
  const nextMonth = () => setCurrentMonth(addDays(monthEnd, 1));

  return (
    <div className="p-6 bg-royal-obsidian/5 border border-royal-gold/10 rounded-none w-full max-w-md mx-auto">
      {/* ===== 🔹 Month Navigation ===== */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={prevMonth}
          className="p-2 text-royal-gold border border-royal-gold/10 hover:border-royal-gold transition-all"
          aria-label="Previous Month"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="text-base font-serif font-bold text-foreground">
          {format(currentMonth, 'MMMM')} <span className="text-royal-gold italic">{format(currentMonth, 'yyyy')}</span>
        </div>

        <button
          onClick={nextMonth}
          className="p-2 text-royal-gold border border-royal-gold/10 hover:border-royal-gold transition-all"
          aria-label="Next Month"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* ===== 🔹 Weekday Labels ===== */}
      <div className="grid grid-cols-7 text-center mb-2">
        {daysOfWeek.map((dayName, index) => (
          <div key={index} className="text-[9px] font-bold tracking-widest text-royal-gold/60 py-2 border-b border-royal-gold/10">
            {dayName}
          </div>
        ))}
      </div>

      {/* ===== 🔹 Date Grid ===== */}
      <div className="grid grid-cols-7 gap-1 mt-2">
        {days.map((dayItem) => {
          const isCurrentMonth = isSameMonth(dayItem, currentMonth);
          const formattedDay = format(dayItem, 'yyyy-MM-dd');
          const isBooked = bookedDates.includes(formattedDay);
          const isPastDate = dayItem < new Date(new Date().setHours(0,0,0,0));

          const isSelected =
            (selectedRange?.from && isSameDay(dayItem, selectedRange.from)) ||
            (selectedRange?.to && isSameDay(dayItem, selectedRange.to));

          const isInRange =
            selectedRange?.from &&
            selectedRange?.to &&
            dayItem > selectedRange.from &&
            dayItem < selectedRange.to;

          const shouldDisable = !isCurrentMonth || isBooked || isPastDate;

          return (
            <button
              key={dayItem.toISOString()}
              onClick={() => onSelectDate(dayItem)}
              disabled={shouldDisable}
              className={`
                h-10 flex items-center justify-center transition-all border text-[11px] font-bold
                ${isSelected ? 'bg-royal-gold text-royal-blue border-royal-gold' : ''}
                ${isInRange ? 'bg-royal-gold/20 text-royal-gold border-royal-gold/10' : ''}
                ${shouldDisable ? 'bg-red-500/5 text-red-500/20 cursor-not-allowed border-transparent' : 'border-white/5 text-foreground/70 hover:bg-royal-gold hover:text-royal-blue'}
                ${!isCurrentMonth ? 'opacity-0 pointer-events-none' : ''}
              `}
              aria-label={format(dayItem, 'eeee, MMMM do, yyyy')}
              type="button"
            >
              {format(dayItem, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
}
