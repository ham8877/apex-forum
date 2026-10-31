import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ThreadCard from "@/components/ThreadCard";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { getCategoryBySlug, getThreads } from "@/lib/data";
import { notFound } from "next/navigation";
import * as Lucide from "lucide-react";

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ sort?: string }> }) {
  const { slug } = await params;
  const sp = await searchParams;
  const user = await getCurrentUser();
  const cat = getCategoryBySlug(slug);
  if (!cat) notFound();
  const sort = sp?.sort || "newest";
  const threads = getThreads({ categoryId: cat.id, sort });
  const Icon = (Lucide as any)[cat.icon] || Lucide.Hash;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <div className="hidden lg:block"><Sidebar activeSlug={slug} /></div>
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: cat.color + "20", color: cat.color }}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{cat.name}</h1>
                <p className="text-muted text-sm">{cat.description} · {cat.threadCount} threads</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {["newest", "popular", "trending"].map((s) => (
                  <Link key={s} href={`/forum/${slug}?sort=${s}`} className={`px-3 py-1.5 text-xs rounded-lg border ${sort === s ? "bg-accent text-white border-accent" : "border-border text-muted hover:text-foreground"}`}>{s}</Link>
                ))}
              </div>
              {user && <Link href={`/thread/new?cat=${cat.id}`}><Button size="sm">New Thread</Button></Link>}
            </div>
          </div>
          <div className="space-y-3">
            {threads.length === 0 && <Card><p className="text-muted text-sm">No threads yet. Be the first!</p></Card>}
            {threads.map((t) => <ThreadCard key={t.id} thread={t} />)}
          </div>
        </div>
      </main>
    </div>
  );
}