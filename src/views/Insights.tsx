import { motion } from 'motion/react';
import { FileText, Sparkles, ArrowRight } from 'lucide-react';
import { JournalEntry } from '../types';

export function Insights({ entries }: { entries: JournalEntry[] }) {
  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      <header className="px-6 py-10 pb-6">
        <h1 className="text-4xl font-serif text-stone-800 font-light">Insights</h1>
        <p className="text-stone-400 mt-2 font-light">Your 30-day reflection.</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-6">
        
        {/* 30-Day Summary Card */}
        <motion.section 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-[0_2px_20px_rgba(0,0,0,0.02)] border border-stone-50 overflow-hidden"
        >
          {/* Card Header */}
          <div className="p-6 bg-stone-50/50 border-b border-stone-50">
            <h2 className="text-2xl font-serif text-stone-800">30-Day Summary</h2>
            <p className="text-sm text-stone-500 font-light mt-1">Based on {entries.length || 1} journal entries</p>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Symptoms & Cycle */}
            <div>
              <h3 className="text-[10px] font-medium text-stone-400 uppercase tracking-widest mb-3">Symptoms & Cycle</h3>
              <p className="text-[15px] text-stone-600 leading-relaxed font-light">
                You often notice <strong className="font-medium text-stone-800">headaches</strong> and <strong className="font-medium text-stone-800">physical tension</strong> around days 22-26 of your cycle (Luteal phase).
              </p>
            </div>

            {/* Sleep & Energy */}
            <div>
              <h3 className="text-[10px] font-medium text-stone-400 uppercase tracking-widest mb-3">Sleep & Energy</h3>
              <p className="text-[15px] text-stone-600 leading-relaxed font-light">
                Your energy tends to dip when your sleep is <strong className="font-medium text-stone-800">interrupted</strong>, usually aligning with higher pain days.
              </p>
            </div>

            {/* Emotional Cues */}
            <div>
              <h3 className="text-[10px] font-medium text-stone-400 uppercase tracking-widest mb-3">Emotional Landscape</h3>
              <p className="text-[15px] text-stone-600 leading-relaxed font-light">
                Words like <strong className="font-medium text-stone-800">"overwhelmed"</strong> and <strong className="font-medium text-stone-800">"drained"</strong> appear more frequently toward the end of your cycle.
              </p>
            </div>

            <div className="h-px bg-stone-100 w-full" />

            {/* Doctor-Ready Summary */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText size={16} className="text-purple-600" />
                <h3 className="text-[10px] font-medium text-purple-900 uppercase tracking-widest">Doctor-Ready Summary</h3>
              </div>
              <div className="bg-[#F8F7FA] p-5 rounded-2xl border border-purple-100/50">
                <p className="text-[14px] text-stone-700 leading-relaxed font-light mb-4">
                  Patient reports recurrent luteal phase headaches and fatigue, accompanied by interrupted sleep and lowered mood. 
                </p>
                <h4 className="text-[10px] font-medium text-stone-500 uppercase tracking-widest mb-3">Suggested Topics to Discuss</h4>
                <ul className="space-y-2">
                  <li className="text-[13px] text-stone-600 flex items-start gap-2 font-light">
                    <span className="text-purple-400 mt-0.5">•</span>
                    Management of luteal phase headaches
                  </li>
                  <li className="text-[13px] text-stone-600 flex items-start gap-2 font-light">
                    <span className="text-purple-400 mt-0.5">•</span>
                    Strategies for sleep disruption
                  </li>
                </ul>
              </div>
              
              <button className="mt-6 w-full flex items-center justify-center gap-2 bg-white border border-stone-200 text-stone-700 py-3.5 rounded-full text-sm font-medium hover:bg-stone-50 transition-colors shadow-sm">
                Export for your doctor
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.section>

        {/* Disclaimer */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="pt-2"
        >
          <div className="flex items-start gap-3 p-5 bg-transparent rounded-3xl border border-stone-100">
            <Sparkles size={18} className="text-stone-400 shrink-0 mt-0.5" />
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              These insights are gentle observations based on your voice entries. They are meant to help you understand your body's rhythms, not to diagnose any condition.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
