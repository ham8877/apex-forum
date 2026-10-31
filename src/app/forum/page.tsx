import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ThreadCard from "@/components/ThreadCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { getThreads, getCategories } from "@/lib/data";
import { Search, Filter } from "lucide-react";

export default async function ForumPage({ searchParams }: { searchParams: Promise<{ sort?: string; q?: string }> }) {
  const user = await getCurrentUser();
  const sp = await searchParams;
  const sort = sp?.sort || "newest";
  const q = sp?.q;
  const threads = getThreads({ sort, q });
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <div className="hidden lg:block"><Sidebar /></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h1 className="text-2xl font-bold">Forum</h1>
            <div className="flex items-center gap-2">
              <form action="/forum" method="get" className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input name="q" defaultValue={q} placeholder="Search..." className="bg-card border border-border rounded-lg pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-accent" />
              </form>
              <div className="flex gap-1">
                {["newest", "popular", "trending"].map((s) => (
                  <Link key={s} href={`/forum?sort=${s}${q ? `&q=${q}` : ""}`} className={`px-3 py-1.5 text-xs rounded-lg border ${sort === s ? "bg-accent text-white border-accent" : "border-border text-muted hover:text-foreground"}`}>{s}</Link>
                ))}
              </div>
              {user && <Link href="/thread/new"><Button size="sm"><Filter className="w-4 h-4" /> New</Button></Link>}
            </div>
          </div>
          {/* Category cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((c) => (
              <Link key={c.id} href={`/forum/${c.slug}`} className="bg-card border border-border rounded-xl p-3 hover:border-accent/40 transition-colors">
                <div className="text-sm font-medium">{c.name}</div>
                <div className="text-xs text-muted mt-1">{c.threadCount} threads</div>
              </Link>
            ))}
          </div>
          <div className="space-y-3">
            {threads.length === 0 && <Card><p className="text-muted text-sm">No threads found.</p></Card>}
            {threads.map((t) => <ThreadCard key={t.id} thread={t} />)}
          </div>
        </div>
      </main>
    </div>
  );
}