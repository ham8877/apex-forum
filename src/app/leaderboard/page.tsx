import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";
import { getUsers } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import { Trophy, Medal } from "lucide-react";

export default async function LeaderboardPage() {
  const user = await getCurrentUser();
  const top = [...getUsers()].sort((a, b) => b.reputation - a.reputation);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Trophy className="w-6 h-6 text-accent" /> Leaderboard</h1>
        <Card>
          <div className="space-y-2">
            {top.map((u, i) => (
              <Link key={u.id} href={`/profile/${u.username}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-card-hover">
                <div className="w-8 text-center font-bold text-muted">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</div>
                <Avatar src={u.avatar} alt={u.username} size={36} />
                <div className="flex-1">
                  <div className="font-medium">{u.username}</div>
                  <div className="text-xs text-muted">{u.postCount} posts</div>
                </div>
                <div className="font-bold text-accent">{formatNumber(u.reputation)}</div>
              </Link>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}