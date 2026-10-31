import { NextResponse } from "next/server";
import { getUsers } from "@/lib/data";

export async function GET() {
  const safe = getUsers().map(({ password, ...u }) => u);
  return NextResponse.json({ users: safe });
}