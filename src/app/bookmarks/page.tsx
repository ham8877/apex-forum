import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import ThreadCard from "@/components/ThreadCard";
import { getThreadById } from "@/lib/data";
import { redirect } from "next/navigation";

export default async function BookmarksPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const threads = user.bookmarks.map((id) => getThreadById(id)).filter(Boolean) as any[];
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold">Bookmarks</h1>
        {threads.length === 0 && <Card><p className="text-muted text-sm">No bookmarks yet.</p></Card>}
        {threads.map((t) => <ThreadCard key={t.id} thread={t} />)}
      </main>
    </div>
  );
}