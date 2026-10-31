import { NextResponse } from "next/server";
import { votePoll, getPollById } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { pollId, optionId } = body;
  votePoll(pollId, optionId, user.id);
  const poll = getPollById(pollId);
  return NextResponse.json({ poll });
}