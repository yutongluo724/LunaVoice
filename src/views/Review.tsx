import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Edit3, Lock } from 'lucide-react';
import { JournalEntry } from '../types';

export function Review({ entry, onSave, onCancel }: { entry: JournalEntry, onSave: (entry: JournalEntry) => void, onCancel: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTranscript, setEditedTranscript] = useState(entry.transcript);

  const handleSave = () => {
    onSave({
      ...entry,
      transcript: editedTranscript
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-[#FAF9F7]"
    >
      <header className="flex items-center justify-between px-6 py-6 bg-[#FAF9F7] sticky top-0 z-10">
        <button onClick={onCancel} className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-stone-100 text-stone-500 hover:text-stone-800 transition-colors">
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <h2 className="text-sm font-medium text-stone-400 uppercase tracking-widest">Review</h2>
        <div className="w-10" />
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-10">
        {/* Transcript Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-serif text-stone-800">Your Words</h3>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`p-2 rounded-full transition-colors ${isEditing ? 'bg-purple-100 text-purple-700' : 'bg-white text-stone-400 shadow-sm border border-stone-100'}`}
            >
              <Edit3 size={16} />
            </button>
          </div>
          
          <div className={`transition-all duration-300 ${isEditing ? 'bg-white p-5 rounded-3xl shadow-sm border border-purple-100' : 'px-2'}`}>
            {isEditing ? (
              <textarea 
                value={editedTranscript}
                onChange={(e) => setEditedTranscript(e.target.value)}
                className="w-full h-40 bg-transparent resize-none focus:outline-none text-stone-700 text-lg leading-relaxed font-light"
                autoFocus
              />
            ) : (
              <p className="text-stone-700 text-lg leading-relaxed font-light">{editedTranscript}</p>
            )}
          </div>
        </section>

        {/* Health Signals & Cues - Grouped for calmness */}
        <section className="bg-white p-6 rounded-[2rem] shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-stone-50 space-y-8">
          <div>
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Detected Signals</h3>
            <div className="flex flex-wrap gap-2">
              <SignalPill label="Pain" value={entry.signals.pain} highlight={entry.signals.pain !== 'none'} />
              <SignalPill label="Energy" value={entry.signals.energy} />
              <SignalPill label="Sleep" value={entry.signals.sleep} />
              {entry.signals.symptoms.map(sym => (
                <SignalPill key={sym} label="Symptom" value={sym} />
              ))}
            </div>
          </div>

          <div className="h-px bg-stone-100 w-full" />

          <div>
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-4">Emotional Cues</h3>
            <div className="flex flex-wrap gap-2">
              {entry.signals.emotionalCues.map((cue, i) => (
                <span key={i} className="px-4 py-2 bg-[#F6F4F9] text-purple-800 rounded-full text-sm font-medium capitalize">
                  {cue}
                </span>
              ))}
              {entry.signals.emotionalCues.length === 0 && (
                <span className="text-stone-400 text-sm italic font-light">No specific cues detected</span>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Action Buttons */}
      <div className="p-6 bg-gradient-to-t from-[#FAF9F7] via-[#FAF9F7] to-transparent pb-8">
        <button 
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 bg-stone-800 text-white py-4 rounded-full font-medium shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:bg-stone-900 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all active:scale-[0.98]"
        >
          <Check size={20} />
          Save to Journal
        </button>
        <div className="flex items-center justify-center gap-1.5 mt-4 text-stone-400">
          <Lock size={12} />
          <span className="text-[10px] uppercase tracking-widest font-medium">Private & Secure</span>
        </div>
      </div>
    </motion.div>
  );
}

function SignalPill({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean, key?: string | number }) {
  return (
    <div className={`px-4 py-2 rounded-full border flex items-center gap-2 ${highlight ? 'bg-orange-50/50 border-orange-100' : 'bg-stone-50 border-stone-100'}`}>
      <span className="text-[10px] text-stone-400 uppercase tracking-wider">{label}:</span>
      <span className={`text-sm font-medium capitalize ${highlight ? 'text-orange-800' : 'text-stone-700'}`}>{value}</span>
    </div>
  );
}
