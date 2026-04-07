import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isWithinInterval, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, X, Play, Square } from 'lucide-react';
import { JournalEntry, CycleRecord } from '../types';

interface CalendarProps {
  entries: JournalEntry[];
  cycleRecords: CycleRecord[];
  onUpdateCycleRecords: (records: CycleRecord[]) => void;
}

export function Calendar({ entries, cycleRecords, onUpdateCycleRecords }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const isDateInPeriod = (date: Date) => {
    return cycleRecords.some(record => {
      const start = parseISO(record.startDate);
      const end = record.endDate ? parseISO(record.endDate) : null;
      
      if (end) {
        return isWithinInterval(date, { start, end });
      }
      return isSameDay(date, start);
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleMarkStart = () => {
    if (!selectedDate) return;
    const newRecord: CycleRecord = {
      id: Date.now().toString(),
      startDate: selectedDate.toISOString(),
    };
    onUpdateCycleRecords([...cycleRecords, newRecord]);
    setSelectedDate(null);
  };

  const handleMarkEnd = () => {
    if (!selectedDate) return;
    
    // Find the most recent record without an end date
    const updatedRecords = [...cycleRecords];
    let openRecordIndex = -1;
    for (let i = updatedRecords.length - 1; i >= 0; i--) {
      if (!updatedRecords[i].endDate) {
        openRecordIndex = i;
        break;
      }
    }
    
    if (openRecordIndex !== -1) {
      updatedRecords[openRecordIndex] = {
        ...updatedRecords[openRecordIndex],
        endDate: selectedDate.toISOString(),
      };
      onUpdateCycleRecords(updatedRecords);
    }
    setSelectedDate(null);
  };

  const hasOpenRecord = cycleRecords.some(r => !r.endDate);

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      <header className="px-6 py-8 pb-4">
        <h1 className="text-3xl font-serif text-stone-800">Calendar</h1>
        <p className="text-stone-500 mt-1">Your cycle at a glance.</p>
      </header>

      <div className="px-6 pb-6 relative">
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
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}
            
            {days.map((day, i) => {
              const hasEntry = entries.some(e => isSameDay(new Date(e.date), day));
              const isPeriod = isDateInPeriod(day);
              const today = isToday(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);

              return (
                <button 
                  key={i} 
                  onClick={() => handleDateClick(day)}
                  className="relative flex items-center justify-center h-10 group"
                >
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm transition-all ${
                      isPeriod ? 'bg-pink-100 text-pink-800 font-medium' : 
                      today ? 'bg-stone-800 text-white font-medium' : 
                      isSelected ? 'bg-purple-100 text-purple-800 ring-2 ring-purple-200' :
                      'text-stone-600 group-hover:bg-stone-50'
                    }`}
                  >
                    {format(day, 'd')}
                  </div>
                  {hasEntry && (
                    <div className="absolute bottom-0 w-1 h-1 bg-purple-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Selection Modal/Overlay */}
        <AnimatePresence>
          {selectedDate && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute inset-x-6 bottom-6 z-20"
            >
              <div className="bg-stone-800 text-white p-5 rounded-3xl shadow-xl border border-stone-700">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-medium">{format(selectedDate, 'MMMM d, yyyy')}</p>
                  <button onClick={() => setSelectedDate(null)} className="text-stone-400 hover:text-white">
                    <X size={18} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={handleMarkStart}
                    className="flex items-center justify-center gap-2 bg-pink-500 text-white py-3 rounded-2xl text-sm font-medium hover:bg-pink-600 transition-colors"
                  >
                    <Play size={14} fill="currentColor" />
                    Period Start
                  </button>
                  <button 
                    onClick={handleMarkEnd}
                    disabled={!hasOpenRecord}
                    className={`flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-colors ${
                      hasOpenRecord 
                        ? 'bg-stone-700 text-white hover:bg-stone-600' 
                        : 'bg-stone-800 text-stone-600 border border-stone-700 cursor-not-allowed'
                    }`}
                  >
                    <Square size={14} fill="currentColor" />
                    Period End
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
