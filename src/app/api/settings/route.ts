import { NextResponse } from "next/server";
import { getUserByUsername, updateUser } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { username, bio, avatar } = body;
  if (username && username !== user.username) {
    const existing = getUserByUsername(username);
    if (existing && existing.id !== user.id) return NextResponse.json({ error: "Username taken" }, { status: 409 });
  }
  const updated = updateUser(user.id, { username: username || user.username, bio: bio ?? user.bio, avatar: avatar || user.avatar });
  if (!updated) return NextResponse.json({ error: "Failed" }, { status: 500 });
  const { password: _, ...safe } = updated;
  return NextResponse.json({ user: safe });
}