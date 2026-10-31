import { NextResponse } from "next/server";
import { createUser, getUserByEmail, getUserByUsername } from "@/lib/data";
import { setSession } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(6),
  reason: z.string().min(10).max(500),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    const { username, email, password, reason } = parsed.data;
    if (getUserByEmail(email)) return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    if (getUserByUsername(username)) return NextResponse.json({ error: "Username taken" }, { status: 409 });
    const user = createUser({ username, email, password, reason });
    await setSession(user.id);
    const { password: _, ...safe } = user;
    return NextResponse.json({ user: safe });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}