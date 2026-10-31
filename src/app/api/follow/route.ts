import { NextResponse } from "next/server";
import { toggleFollow, getUserById } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { targetId } = body;
  if (!targetId || targetId === user.id) return NextResponse.json({ error: "Invalid" }, { status: 400 });
  toggleFollow(user.id, targetId);
  const target = getUserById(targetId);
  const following = !!target?.followers.includes(user.id);
  return NextResponse.json({ following });
}