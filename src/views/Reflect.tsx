import { motion } from 'motion/react';
import { ArrowRight, MessageCircleHeart } from 'lucide-react';

export function Reflect() {
  const prompts = [
    "Anything you want your doctor to know?",
    "How have you been feeling overall this week?",
    "What's one thing that brought you comfort today?",
    "Are there any new symptoms you've noticed?",
    "How is your energy compared to yesterday?"
  ];

  return (
    <div className="flex flex-col h-full bg-[#FAF9F7]">
      <header className="px-6 py-8 pb-4">
        <h1 className="text-3xl font-serif text-stone-800">Reflect</h1>
        <p className="text-stone-500 mt-1">Gentle prompts for your next entry.</p>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-4">
        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-start gap-4 mb-6">
          <MessageCircleHeart size={24} className="text-emerald-700 shrink-0 mt-1" />
          <p className="text-emerald-800 leading-relaxed text-sm">
            Sometimes it's hard to know what to say. Use these prompts to guide your next voice journal. 
            Tap any prompt to start recording with it in mind.
          </p>
        </div>

        <div className="space-y-3">
          {prompts.map((prompt, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between group hover:border-purple-200 transition-colors text-left"
            >
              <span className="text-stone-700 font-medium pr-4">{prompt}</span>
              <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center shrink-0 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                <ArrowRight size={16} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
