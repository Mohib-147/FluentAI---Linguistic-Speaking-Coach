export const runtime = "nodejs";

import { NextRequest } from "next/server";
import { queryOne } from "@/lib/db";
import { loginSchema } from "@/lib/validations";
import { comparePassword, generateJWT } from "@/lib/auth";
import { error, ok } from "@/lib/response";
import type { ZodIssue } from "zod";

export async function POST(req: NextRequest) {
  try {
    // Parse JSON body
    const body = await req.json();

    // Validate with Zod
    const parse = loginSchema.safeParse(body);
    if (!parse.success) {
      const message = parse.error.issues.map((e: ZodIssue) => e.message).join(", ");
      return error("Invalid input: " + message, 400);
    }
    const { email, password } = parse.data;

    // Get user by email
    const user = await queryOne(
      "SELECT id, email, username, password_hash FROM users WHERE email = ? LIMIT 1",
      [email]
    );
    if (!user) {
      return error("Email or password is incorrect", 401);
    }

    // Check password
    const passwordMatch = await comparePassword(password, user.password_hash);
    if (!passwordMatch) {
      return error("Email or password is incorrect", 401);
    }

    // Generate JWT token
    const token = generateJWT(user.id, user.email);

    // Optionally send user info besides token
    return ok({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    return error("Internal server error", 500);
  }
}