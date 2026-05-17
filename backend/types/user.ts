export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: string;     // ISO date string
  updated_at: string;     // ISO date string
}