import { motion } from 'motion/react';
import { format } from 'date-fns';
import { JournalEntry } from '../types';

export function Journal({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      <header className="px-6 py-10 pb-6">
        <h1 className="text-4xl font-serif text-stone-800 font-light">Journal</h1>
        <p className="text-stone-400 mt-2 font-light">Your voice, your patterns.</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-5">
        {entries.map((entry, index) => (
          <motion.div 
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-6 rounded-[2rem] shadow-[0_2px_16px_rgba(0,0,0,0.02)] border border-stone-50"
          >
            <div className="flex items-baseline justify-between mb-4">
              <h3 className="text-xl font-serif text-stone-800">
                {format(new Date(entry.date), 'MMMM d')}
              </h3>
              <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">
                Day {entry.signals.cycleDay}
              </span>
            </div>
            
            <p className="text-stone-600 leading-relaxed line-clamp-3 mb-6 font-light text-[15px]">
              "{entry.transcript}"
            </p>

            <div className="flex flex-wrap gap-4">
              {entry.signals.pain !== 'none' && (
                <MinimalTag label={`Pain: ${entry.signals.pain}`} color="orange" />
              )}
              {entry.signals.emotionalCues.slice(0, 2).map((cue, i) => (
                <MinimalTag key={i} label={cue} color="purple" />
              ))}
              {entry.signals.symptoms.slice(0, 1).map((sym, i) => (
                <MinimalTag key={i} label={sym} color="stone" />
              ))}
            </div>
          </motion.div>
        ))}
        
        {entries.length === 0 && (
          <div className="text-center py-16">
            <p className="text-stone-400 font-light">No entries yet. Tap the microphone to start.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MinimalTag({ label, color }: { label: string, color: 'orange' | 'purple' | 'stone', key?: string | number }) {
  const dotColors = {
    orange: 'bg-orange-400',
    purple: 'bg-purple-400',
    stone: 'bg-stone-300',
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-1.5 h-1.5 rounded-full ${dotColors[color]}`} />
      <span className="text-xs font-medium text-stone-500 capitalize">{label}</span>
    </div>
  );
}
