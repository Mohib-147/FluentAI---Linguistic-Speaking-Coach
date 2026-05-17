export interface SpeakingSession {
  id: number;
  user_id: number;
  topic_id: number;
  audio_url?: string;
  transcript?: string;
  score?: number;
  duration_sec?: number;
  wpm?: number;
  filler_count?: number;
  created_at: string; // ISO date string
}