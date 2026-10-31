import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { banUser, suspendUser, deleteThread, resolveReport, getCategories } from "@/lib/data";
// category creation helper
import { getStore } from "@/lib/data";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const body = await req.json();
  const { action } = body;
  switch (action) {
    case "ban": banUser(body.userId, body.banned); break;
    case "suspend": suspendUser(body.userId, body.suspended); break;
    case "deleteThread": deleteThread(body.threadId); break;
    case "resolveReport": resolveReport(body.reportId); break;
    case "deleteCategory": {
      const store = getStore();
      const idx = store.categories.findIndex((c) => c.id === body.categoryId);
      if (idx >= 0) store.categories.splice(idx, 1);
      break;
    }
    case "createCategory": {
      const store = getStore();
      const slug = body.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
      store.categories.push({ id: "c" + Math.random().toString(36).slice(2, 8), name: body.name, slug, description: "", icon: "Hash", color: "#6b7280", threadCount: 0 });
      break;
    }
    default: return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}