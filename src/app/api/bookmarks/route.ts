import { NextResponse } from "next/server";
import { toggleBookmark, getUserById } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { threadId } = body;
  toggleBookmark(user.id, threadId);
  const u = getUserById(user.id);
  const bookmarked = !!u?.bookmarks.includes(threadId);
  return NextResponse.json({ bookmarked });
}