export type PainLevel = 'none' | 'low' | 'moderate' | 'high' | 'unknown';
export type PainType = 'cramps' | 'headache' | 'pelvic pain' | 'back pain' | 'breast tenderness' | 'other' | 'none';
export type EnergyLevel = 'low' | 'medium' | 'high' | 'unknown';
export type SleepQuality = 'poor' | 'okay' | 'good' | 'unknown';
export type EmotionalCue = 'stressed' | 'low mood' | 'overwhelmed' | 'calm' | 'frustrated' | 'anxious' | 'irritable' | 'emotionally drained' | 'hopeful' | 'steady';
export type CyclePhase = 'menstrual' | 'follicular' | 'ovulatory' | 'luteal' | 'unknown';

export interface HealthSignals {
  pain: PainLevel;
  painType: PainType[];
  energy: EnergyLevel;
  sleep: SleepQuality;
  symptoms: string[];
  emotionalCues: EmotionalCue[];
  cycleDay: number;
  phase: CyclePhase;
}

export interface JournalEntry {
  id: string;
  date: string;
  transcript: string;
  signals: HealthSignals;
}

export interface CycleRecord {
  id: string;
  startDate: string;
  endDate?: string;
}
