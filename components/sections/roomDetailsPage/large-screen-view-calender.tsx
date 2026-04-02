// ====================================================
// 📅 CustomCalendar Component – Visual Calendar for Booking with Disabled Dates, Selection & Range
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
    <div>
      {/* ========== 📅 Header: Month Navigation ========== */}
      <div className="flex justify-between items-center mb-3 text-foreground pb-2">
        <button
          aria-label="Previous month"
          onClick={prevMonth}
          className="p-1 hover:text-[#bf9310] border border-transparent rounded hover:border-[#bf9310]"
          type="button"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </div>
        <button
          aria-label="Next month"
          onClick={nextMonth}
          className="p-1 hover:text-[#bf9310] border border-transparent rounded hover:border-[#bf9310]"
          type="button"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* ========== 🗓️ Weekday Headers ========== */}
      <div className="grid grid-cols-7 gap-1 text-xs text-foreground select-none border-b border-slate-700 pb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-medium">
            {day}
          </div>
        ))}
      </div>

      {/* ========== 📆 Calendar Days ========== */}
      <div className="grid grid-cols-7 gap-1 mt-1 ml-6">
        {/* Empty start cells */}
        {Array(monthStart.getDay())
          .fill(null)
          .map((_, i) => (
            <div key={`empty-${i}`} />
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
              className={`w-10 h-10 flex items-center justify-center text-sm border 
                ${
                  isDisabled
                    ? 'bg-red-600 text-foreground cursor-not-allowed border-red-700'
                    : isSelected
                      ? 'bg-[#bf9310] text-black font-bold border-yellow-400'
                      : inRange
                        ? 'bg-yellow-600 text-black border-yellow-300'
                        : 'hover:bg-yellow-400 hover:text-black text-foreground border-slate-700'
                }
                ${isToday ? 'border-2 border-slate-400' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {/* ========== 🧾 Legend ========== */}
      <div className="mt-4 flex gap-4 text-sm text-foreground">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#bf9310] rounded" />
          Selected
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded" />
          Booked
        </div>
      </div>
    </div>
  );
}
