export const runtime = "nodejs";
import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { query } from "@/lib/db";
import { ok, error } from "@/lib/response";

export async function POST(req: NextRequest) {
  const authed = await requireAuth(req);
  if (authed instanceof Response) return authed;
  const { userId } = authed;

  try {
    const { session_id, rating, comment } = await req.json();
    if (!session_id || !rating) return error("Missing fields", 400);

    await query(
      "INSERT INTO feedback (user_id, session_id, rating, comment) VALUES (?, ?, ?, ?)",
      [userId, session_id, rating, comment || null]
    );
    return ok({ message: "Feedback submitted" });
  } catch (err) {
    return error("Internal server error", 500);
  }
}