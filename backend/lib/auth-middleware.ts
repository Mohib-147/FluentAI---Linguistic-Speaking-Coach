import { NextRequest } from "next/server";
import { verifyJWT } from "@/lib/auth";
import { error } from "@/lib/response";

export async function requireAuth(req: NextRequest): Promise<{ userId: number; email: string } | Response> {
  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Bearer ")) {
    return error("Authorization header missing or invalid", 401);
  }
  const token = auth.slice(7);

  try {
    const payload = verifyJWT(token) as { userId: number; email: string };
    return payload;
  } catch {
    return error("Invalid or expired token", 401);
  }
}