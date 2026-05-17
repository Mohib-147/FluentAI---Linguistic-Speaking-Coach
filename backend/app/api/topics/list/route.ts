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
    const topics = await query("SELECT id, title, created_at FROM topics WHERE user_id = ?", [userId]);
    return ok(topics);
  } catch (err) {
    return error("Internal server error", 500);
  }
}