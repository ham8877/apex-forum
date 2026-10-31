import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ThreadCard from "@/components/ThreadCard";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { getTrendingThreads, getLatestThreads, getFeaturedMembers, getOnlineCount, getCategories } from "@/lib/data";
import { formatNumber, timeAgo } from "@/lib/utils";
import { TrendingUp, Users, MessageSquare, Flame, ArrowRight, ShieldCheck } from "lucide-react";

export default async function Home() {
  const user = await getCurrentUser();
  const trending = getTrendingThreads();
  const latest = getLatestThreads();
  const featured = getFeaturedMembers();
  const online = getOnlineCount();
  const categories = getCategories();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 py-6 grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] gap-6">
        <div className="hidden lg:block"><Sidebar /></div>

        <div className="space-y-6">
          {/* Hero */}
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/25 via-accent/5 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Badge color="#dc2626">Community</Badge>
                <span className="text-xs text-muted">{online} members online now</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Welcome to <span className="text-accent">Apex Forum</span>
              </h1>
              <p className="text-muted mt-2 max-w-2xl">
                The modern community for self-improvement, fitness, style, grooming, and lifestyle.
                Learn, share, and level up — together.
              </p>
              <div className="flex gap-3 mt-4">
                {user ? (
                  <Link href="/thread/new"><Button>New Thread</Button></Link>
                ) : (
                  <>
                    <Link href="/register"><Button>Join the community</Button></Link>
                    <Link href="/login"><Button variant="secondary">Log in</Button></Link>
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* Trending */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2"><Flame className="w-5 h-5 text-accent" /> Trending Discussions</h2>
              <Link href="/forum" className="text-sm text-accent hover:underline flex items-center gap-1">View all <ArrowRight className="w-3.5 h-3.5" /></Link>
            </div>
            <div className="space-y-3">
              {trending.map((t) => <ThreadCard key={t.id} thread={t} />)}
            </div>
          </section>

          {/* Latest */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold flex items-center gap-2"><MessageSquare className="w-5 h-5 text-muted" /> Latest Posts</h2>
            </div>
            <div className="space-y-3">
              {latest.map((t) => <ThreadCard key={t.id} thread={t} />)}
            </div>
          </section>
        </div>

        {/* Right rail */}
        <aside className="space-y-4 hidden md:block">
          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-accent" /> Popular Categories</h3>
            <div className="space-y-2">
              {categories.slice(0, 6).map((c) => (
                <Link key={c.id} href={`/forum/${c.slug}`} className="flex items-center justify-between text-sm hover:text-accent">
                  <span>{c.name}</span>
                  <span className="text-muted text-xs">{formatNumber(c.threadCount)}</span>
                </Link>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2"><Users className="w-4 h-4 text-accent" /> Featured Members</h3>
            <div className="space-y-3">
              {featured.map((u) => (
                <Link key={u.id} href={`/profile/${u.username}`} className="flex items-center gap-3 hover:bg-card-hover rounded-lg p-1 -m-1">
                  <Avatar src={u.avatar} alt={u.username} size={32} />
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{u.username}</div>
                    <div className="text-xs text-muted">{formatNumber(u.reputation)} rep</div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="font-semibold mb-3 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-accent" /> Community Stats</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div><div className="text-xl font-bold">{formatNumber(6)}</div><div className="text-xs text-muted">Members</div></div>
              <div><div className="text-xl font-bold">{formatNumber(10)}</div><div className="text-xs text-muted">Threads</div></div>
              <div><div className="text-xl font-bold">{online}</div><div className="text-xs text-muted">Online</div></div>
              <div><div className="text-xl font-bold">8</div><div className="text-xs text-muted">Categories</div></div>
            </div>
          </Card>
        </aside>
      </main>
      <footer className="border-t border-border py-6 text-center text-xs text-muted mt-8">
        © {new Date().getFullYear()} Apex Forum Community. Built with Next.js & Supabase.
      </footer>
    </div>
  );
}