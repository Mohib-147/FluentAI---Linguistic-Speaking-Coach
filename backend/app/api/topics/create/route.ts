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
    const { title } = await req.json();
    if (!title) return error("Title required", 400);

    await query("INSERT INTO topics (user_id, title) VALUES (?, ?)", [userId, title]);
    return ok({ message: "Topic created" });
  } catch (err) {
    return error("Internal server error", 500);
  }
}