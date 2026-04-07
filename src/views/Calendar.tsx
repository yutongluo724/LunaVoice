import { useState } from 'react';
import { motion } from 'motion/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { JournalEntry } from '../types';

export function Calendar({ entries }: { entries: JournalEntry[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Mock period days for visual context
  const periodDays = [1, 2, 3, 4, 5, 28, 29, 30, 31];

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      <header className="px-6 py-8 pb-4">
        <h1 className="text-3xl font-serif text-stone-800">Calendar</h1>
        <p className="text-stone-500 mt-1">Your cycle at a glance.</p>
      </header>

      <div className="px-6 pb-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 text-stone-400 hover:text-stone-600">
              <ChevronLeft size={20} />
            </button>
            <h2 className="text-lg font-medium text-stone-800">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <button onClick={nextMonth} className="p-2 text-stone-400 hover:text-stone-600">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center mb-2">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
              <div key={i} className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center">
            {/* Empty slots for start of month */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}
            
            {days.map((day, i) => {
              const hasEntry = entries.some(e => isSameDay(new Date(e.date), day));
              const isPeriod = periodDays.includes(day.getDate());
              const today = isToday(day);

              return (
                <div key={i} className="relative flex items-center justify-center h-10">
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm transition-colors ${
                      isPeriod ? 'bg-pink-100 text-pink-800 font-medium' : 
                      today ? 'bg-stone-800 text-white font-medium' : 
                      'text-stone-600'
                    }`}
                  >
                    {format(day, 'd')}
                  </div>
                  {hasEntry && (
                    <div className="absolute bottom-0 w-1 h-1 bg-purple-500 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider">Legend</h3>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-100" />
              <span className="text-sm text-stone-600">Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-purple-500" />
              <span className="text-sm text-stone-600">Journal Entry</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
