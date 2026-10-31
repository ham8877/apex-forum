import { NextResponse } from "next/server";
import { createComment } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { threadId, content, parentId } = body;
  if (!threadId || !content?.trim()) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const comment = createComment({ threadId, authorId: user.id, content: content.trim(), parentId });
  return NextResponse.json({ comment });
}