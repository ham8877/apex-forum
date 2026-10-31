import { NextResponse } from "next/server";
import { createReport } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const { targetType, targetId, reason } = body;
  if (!targetType || !targetId || !reason) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  createReport({ reporterId: user.id, targetType, targetId, reason });
  return NextResponse.json({ ok: true });
}