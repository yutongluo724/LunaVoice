import { useState, useEffect } from 'react';
import { Mic, Square } from 'lucide-react';
import { motion } from 'motion/react';
import { JournalEntry } from '../types';

export function Home({ onRecordComplete }: { onRecordComplete: (entry: JournalEntry) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let interval: number;
    if (isRecording) {
      interval = window.setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate processing and returning a new entry
      setTimeout(() => {
        onRecordComplete({
          id: Date.now().toString(),
          date: new Date().toISOString(),
          transcript: "I've been feeling a bit sluggish today. My head hurts slightly and I'm just feeling a bit drained emotionally. I think I need to rest.",
          signals: {
            pain: 'low',
            painType: ['headache'],
            energy: 'low',
            sleep: 'unknown',
            symptoms: ['sluggish'],
            emotionalCues: ['emotionally drained', 'low mood'],
            cycleDay: 24,
            phase: 'luteal'
          }
        });
      }, 1500);
    } else {
      setIsRecording(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center relative">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-4xl font-serif text-stone-800 font-light leading-tight">
          How are you<br/>feeling today?
        </h1>
        <p className="text-[10px] text-stone-400 mt-6 tracking-[0.2em] uppercase font-medium">
          Cycle day 24 <span className="mx-2">·</span> Luteal phase
        </p>
      </motion.div>

      <div className="relative flex items-center justify-center w-64 h-64 mb-4">
        {isRecording && (
          <>
            <motion.div 
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-0 bg-purple-300 rounded-full"
            />
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-4 bg-purple-200 rounded-full"
            />
          </>
        )}
        
        <button
          onClick={handleToggleRecording}
          className={`relative z-10 flex items-center justify-center w-28 h-28 rounded-full transition-all duration-500 ${
            isRecording 
              ? 'bg-purple-600 text-white shadow-[0_0_40px_rgba(147,51,234,0.4)] scale-95' 
              : 'bg-gradient-to-b from-white to-stone-50 text-stone-800 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-white hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:scale-105'
          }`}
        >
          {isRecording ? <Square size={32} fill="currentColor" /> : <Mic size={36} strokeWidth={1.5} />}
        </button>
      </div>

      <div className="h-12 flex items-center justify-center">
        {isRecording ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-purple-600 font-mono text-xl font-light tracking-widest"
          >
            {formatTime(recordingTime)}
          </motion.p>
        ) : (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-stone-400 font-light"
          >
            Tap to start your voice journal
          </motion.p>
        )}
      </div>
    </div>
  );
}
