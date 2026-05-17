export const runtime = "nodejs";
import { NextRequest } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { queryOne } from "@/lib/db";
import { ok, error } from "@/lib/response";

export async function GET(req: NextRequest) {
  const authed = await requireAuth(req);
  if (authed instanceof Response) return authed;
  const { userId } = authed;

  try {
    const user = await queryOne("SELECT id, username, email FROM users WHERE id = ?", [userId]);
    if (!user) return error("User not found", 404);
    return ok(user);
  } catch (err) {
    return error("Internal server error", 500);
  }
}