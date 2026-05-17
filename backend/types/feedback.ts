export interface Feedback {
  id: number;
  session_id: number;
  ai_feedback?: string;
  human_feedback?: string;
  created_at: string;
}