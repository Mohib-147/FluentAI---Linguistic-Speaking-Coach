export const runtime = "nodejs";
import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { query } from "@/lib/db";
import { ok, error } from "@/lib/response";

export async function GET(req: NextRequest) {
  const authed = await requireAuth(req);
  if (authed instanceof Response) return authed;
  const { userId } = authed;

  try {
    const sessions = await query(
      `SELECT id, topic_id, audio_url, transcript, score, duration_sec, wpm, filler_count, created_at
       FROM speaking_sessions WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );
    return ok(sessions);
  } catch (err) {
    console.error("Speaking sessions fetch error:", err);
    return error("Internal server error", 500);
  }
}