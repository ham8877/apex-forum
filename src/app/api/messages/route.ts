import { NextResponse } from "next/server";
import { getMessagesFor, createMessage, markMessageRead } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const msgs = getMessagesFor(user.id);
  msgs.forEach((m) => { if (m.toId === user.id) markMessageRead(m.id); });
  return NextResponse.json({ messages: msgs });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { toId, content } = body;
  if (!toId || !content?.trim()) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const m = createMessage(user.id, toId, content.trim());
  return NextResponse.json({ message: m });
}