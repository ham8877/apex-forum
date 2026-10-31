import Link from "next/link";
import { getCategories } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import * as Lucide from "lucide-react";

export default function Sidebar({ activeSlug }: { activeSlug?: string }) {
  const categories = getCategories();
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-20 space-y-2">
        <div className="text-xs font-semibold text-muted uppercase tracking-wider px-3 mb-2">Categories</div>
        <nav className="space-y-1">
          {categories.map((c) => {
            const Icon = (Lucide as any)[c.icon] || Lucide.Hash;
            const active = activeSlug === c.slug;
            return (
              <Link
                key={c.id}
                href={`/forum/${c.slug}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active ? "bg-accent/10 text-accent border border-accent/20" : "text-muted hover:text-foreground hover:bg-card"}`}
              >
                <Icon className="w-4 h-4 shrink-0" style={{ color: active ? undefined : c.color }} />
                <span className="flex-1 truncate">{c.name}</span>
                <span className="text-xs text-muted">{formatNumber(c.threadCount)}</span>
              </Link>
            );
          })}
        </nav>
        <div className="pt-4 border-t border-border mt-4">
          <div className="text-xs font-semibold text-muted uppercase tracking-wider px-3 mb-2">Community</div>
          <Link href="/members" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-card"><Lucide.Users className="w-4 h-4" /> Members</Link>
          <Link href="/leaderboard" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-card"><Lucide.Trophy className="w-4 h-4" /> Leaderboard</Link>
          <Link href="/polls" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-card"><Lucide.BarChart3 className="w-4 h-4" /> Polls</Link>
        </div>
      </div>
    </aside>
  );
}