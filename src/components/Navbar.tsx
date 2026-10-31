"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Menu, Bell, User, LogOut, Settings, Plus, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Button from "@/components/ui/Button";

export default function Navbar({ user }: { user: any }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-7 rounded-md bg-foreground flex items-center justify-center font-bold text-background text-xs">AF</div>
          <span className="font-bold tracking-wide text-foreground">APEX FORUM</span>
        </Link>

        <form onSubmit={onSearch} className="flex-1 max-w-xl relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search threads, users..."
            className="w-full bg-card border border-border rounded-lg pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </form>

        <nav className="hidden md:flex items-center gap-1">
          <Link href="/forum" className="px-3 py-1.5 text-sm text-muted hover:text-foreground rounded-lg hover:bg-card">Forum</Link>
          <Link href="/members" className="px-3 py-1.5 text-sm text-muted hover:text-foreground rounded-lg hover:bg-card">Members</Link>
          <Link href="/polls" className="px-3 py-1.5 text-sm text-muted hover:text-foreground rounded-lg hover:bg-card">Polls</Link>
        </nav>

        <div className="flex items-center gap-2 ml-auto">
          <ThemeToggle />
          {user ? (
            <>
              <Link href="/thread/new">
                <Button size="sm" variant="primary"><Plus className="w-4 h-4" /> New Thread</Button>
              </Link>
              <Link href="/notifications" className="relative p-2 rounded-lg hover:bg-card text-muted hover:text-foreground">
                <Bell className="w-5 h-5" />
                {user.notifications > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">{user.notifications}</span>
                )}
              </Link>
              <div className="relative">
                <button onClick={() => setOpen(!open)} className="flex items-center gap-2 p-1 rounded-lg hover:bg-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user.avatar} alt={user.username} className="w-7 h-7 rounded-full border border-border" />
                  <ChevronDown className="w-3 h-3 text-muted" />
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-2xl py-1 animate-fade-in">
                    <Link href={`/profile/${user.username}`} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-card-hover"><User className="w-4 h-4" /> Profile</Link>
                    <Link href="/settings" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-card-hover"><Settings className="w-4 h-4" /> Settings</Link>
                    <Link href="/bookmarks" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-card-hover">Bookmarks</Link>
                    {user.role === "admin" && (
                      <Link href="/admin" onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-card-hover text-accent">Admin</Link>
                    )}
                    <button onClick={async () => { await fetch("/api/auth/logout", { method: "POST" }); router.push("/"); router.refresh(); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-card-hover text-red-400"><LogOut className="w-4 h-4" /> Log out</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login"><Button size="sm" variant="ghost">Log in</Button></Link>
              <Link href="/register"><Button size="sm" variant="primary">Sign up</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}