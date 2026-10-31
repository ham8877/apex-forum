import { NextResponse } from "next/server";
import { createThread } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(5).max(120),
  content: z.string().min(10),
  categoryId: z.string().min(1),
});

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (user.banned || user.suspended) return NextResponse.json({ error: "Account restricted" }, { status: 403 });
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const thread = createThread({ ...parsed.data, authorId: user.id });
  return NextResponse.json({ thread });
}