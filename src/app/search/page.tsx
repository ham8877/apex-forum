import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import ThreadCard from "@/components/ThreadCard";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";
import { searchAll } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const user = await getCurrentUser();
  const sp = await searchParams;
  const q = sp?.q || "";
  const { threads, users } = q ? searchAll(q) : { threads: [], users: [] };
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold">Search results for "{q}"</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h2 className="font-semibold mb-3">Threads ({threads.length})</h2>
            <div className="space-y-2">
              {threads.length === 0 && <p className="text-muted text-sm">No threads.</p>}
              {threads.map((t) => <ThreadCard key={t.id} thread={t} />)}
            </div>
          </Card>
          <Card>
            <h2 className="font-semibold mb-3">Users ({users.length})</h2>
            <div className="space-y-2">
              {users.length === 0 && <p className="text-muted text-sm">No users.</p>}
              {users.map((u) => (
                <Link key={u.id} href={`/profile/${u.username}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-card-hover">
                  <Avatar src={u.avatar} alt={u.username} size={32} />
                  <span>{u.username}</span>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}