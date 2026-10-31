import { NextResponse } from "next/server";
import { toggleLike } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { target, id, kind } = body;
  if (!target || !id || !kind) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const item = toggleLike(target, id, user.id, kind);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ likes: item.likes, dislikes: item.dislikes });
}