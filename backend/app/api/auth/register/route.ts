export const runtime = "nodejs";
import { NextRequest } from "next/server";
import { query, queryOne } from "@/lib/db"; // use helpers!
import { registerSchema } from "@/lib/validations";
import { hashPassword } from "@/lib/auth";
import { error, ok } from "@/lib/response";
import type { ZodIssue } from "zod";
import "dotenv/config";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parse = registerSchema.safeParse(body);
    if (!parse.success) {
      const message = parse.error.issues.map((e: ZodIssue) => e.message).join(", ");
      return error("Invalid input: " + message, 400);
    }
    const { username, email, password } = parse.data;

    // Use queryOne helper!
    const existingUser = await queryOne("SELECT id FROM users WHERE username = ? OR email = ? LIMIT 1", [username, email]);
    if (existingUser) {
      return error("Username or email already taken", 409);
    }

    const password_hash = await hashPassword(password);

    // Use query helper for insert
    await query("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)", [
      username,
      email,
      password_hash,
    ]);

    return ok({ message: "Registration successful" });
  } catch (err) {
    console.error("Register Error:", err);
    return error("Internal server error", 500);
  }
}