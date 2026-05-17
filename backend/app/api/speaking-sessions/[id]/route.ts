// backend/app/api/speaking_sessions/[id]/route.ts

export const runtime = "nodejs";
import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { query, queryOne } from "@/lib/db";
import { ok, error } from "@/lib/response";

// GET individual session
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const authed = await requireAuth(req);
  if (authed instanceof Response) return authed;
  const { userId } = authed;

  try {
    const session = await queryOne(
      `SELECT * FROM speaking_sessions WHERE id = ? AND user_id = ?`,
      [params.id, userId]
    );
    if (!session) return error("Session not found", 404);
    return ok(session);
  } catch (err) {
    console.error("Get speaking session error:", err);
    return error("Internal server error", 500);
  }
}

// DELETE session
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const authed = await requireAuth(req);
  if (authed instanceof Response) return authed;
  const { userId } = authed;

  try {
    await query(`DELETE FROM speaking_sessions WHERE id = ? AND user_id = ?`, [params.id, userId]);
    return ok({ message: "Session deleted if it belonged to user" });
  } catch (err) {
    console.error("Delete session error:", err);
    return error("Internal server error", 500);
  }
}