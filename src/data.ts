import { JournalEntry } from './types';

export const mockEntries: JournalEntry[] = [
  {
    id: '1',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
    transcript: "I'm feeling pretty exhausted today. My lower back has been aching since I woke up, and I just feel a bit overwhelmed with everything going on at work. I didn't sleep well last night either.",
    signals: {
      pain: 'moderate',
      painType: ['back pain'],
      energy: 'low',
      sleep: 'poor',
      symptoms: ['exhaustion'],
      emotionalCues: ['overwhelmed', 'emotionally drained'],
      cycleDay: 24,
      phase: 'luteal'
    }
  },
  {
    id: '2',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    transcript: "Feeling much better today. Woke up with good energy and went for a short walk. Mood is steady, no pain at all.",
    signals: {
      pain: 'none',
      painType: ['none'],
      energy: 'high',
      sleep: 'good',
      symptoms: [],
      emotionalCues: ['steady', 'calm'],
      cycleDay: 22,
      phase: 'luteal'
    }
  },
  {
    id: '3',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    transcript: "Had some mild cramps this morning, but they went away after a warm cup of tea. Feeling a bit anxious about an upcoming presentation, but overall okay.",
    signals: {
      pain: 'low',
      painType: ['cramps'],
      energy: 'medium',
      sleep: 'okay',
      symptoms: [],
      emotionalCues: ['anxious'],
      cycleDay: 15,
      phase: 'ovulatory'
    }
  }
];
