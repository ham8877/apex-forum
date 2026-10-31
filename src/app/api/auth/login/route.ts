import { NextResponse } from "next/server";
import { authenticate } from "@/lib/data";
import { setSession } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    const user = authenticate(email, password);
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    await setSession(user.id);
    const { password: _, ...safe } = user;
    return NextResponse.json({ user: safe });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}