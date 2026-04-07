import { useState, ReactNode } from 'react';
import { BookOpen, Calendar as CalendarIcon, Mic, Sparkles, HeartPulse } from 'lucide-react';
import { cn } from './lib/utils';
import { Home } from './views/Home';
import { Journal } from './views/Journal';
import { Calendar } from './views/Calendar';
import { Insights } from './views/Insights';
import { Reflect } from './views/Reflect';
import { Review } from './views/Review';
import { JournalEntry, CycleRecord } from './types';
import { mockEntries } from './data';

export type Tab = 'home' | 'journal' | 'calendar' | 'insights' | 'reflect' | 'review';

export default function App() {
  const [currentTab, setCurrentTab] = useState<Tab>('home');
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries);
  const [cycleRecords, setCycleRecords] = useState<CycleRecord[]>([]);
  const [pendingEntry, setPendingEntry] = useState<JournalEntry | null>(null);

  const handleRecordComplete = (entry: JournalEntry) => {
    setPendingEntry(entry);
    setCurrentTab('review');
  };

  const handleSaveEntry = (entry: JournalEntry) => {
    setEntries([entry, ...entries]);
    setPendingEntry(null);
    setCurrentTab('journal');
  };

  const handleCancelEntry = () => {
    setPendingEntry(null);
    setCurrentTab('home');
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[#FAF9F7] text-stone-800 font-sans overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-24">
        {currentTab === 'home' && <Home onRecordComplete={handleRecordComplete} />}
        {currentTab === 'journal' && <Journal entries={entries} />}
        {currentTab === 'calendar' && (
          <Calendar 
            entries={entries} 
            cycleRecords={cycleRecords} 
            onUpdateCycleRecords={setCycleRecords} 
          />
        )}
        {currentTab === 'insights' && <Insights entries={entries} />}
        {currentTab === 'reflect' && <Reflect />}
        {currentTab === 'review' && pendingEntry && (
          <Review 
            entry={pendingEntry} 
            onSave={handleSaveEntry} 
            onCancel={handleCancelEntry} 
          />
        )}
      </main>

      {/* Bottom Navigation */}
      {currentTab !== 'review' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-stone-100 px-6 py-4 pb-6">
          <div className="flex justify-between items-center max-w-md mx-auto">
            <NavItem 
              icon={<BookOpen size={24} />} 
              label="Journal" 
              isActive={currentTab === 'journal'} 
              onClick={() => setCurrentTab('journal')} 
            />
            <NavItem 
              icon={<CalendarIcon size={24} />} 
              label="Calendar" 
              isActive={currentTab === 'calendar'} 
              onClick={() => setCurrentTab('calendar')} 
            />
            
            {/* Center Mic Button */}
            <button 
              onClick={() => setCurrentTab('home')}
              className={cn(
                "relative -top-5 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 active:scale-95",
                currentTab === 'home' 
                  ? "bg-stone-800 text-white shadow-[0_8px_20px_rgba(0,0,0,0.15)]" 
                  : "bg-white text-stone-400 border border-stone-100 shadow-[0_4px_10px_rgba(0,0,0,0.05)] hover:text-stone-600"
              )}
            >
              <Mic size={24} strokeWidth={currentTab === 'home' ? 2 : 1.5} />
            </button>

            <NavItem 
              icon={<Sparkles size={24} />} 
              label="Insights" 
              isActive={currentTab === 'insights'} 
              onClick={() => setCurrentTab('insights')} 
            />
            <NavItem 
              icon={<HeartPulse size={24} />} 
              label="Reflect" 
              isActive={currentTab === 'reflect'} 
              onClick={() => setCurrentTab('reflect')} 
            />
          </div>
        </nav>
      )}
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 transition-colors",
        isActive ? "text-purple-700" : "text-stone-400 hover:text-stone-600"
      )}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
