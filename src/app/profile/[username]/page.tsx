import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { getUserByUsername, getThreads } from "@/lib/data";
import FollowButton from "@/components/FollowButton";
import { timeAgo, formatNumber } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Users, MessageSquare, Trophy, Calendar } from "lucide-react";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const viewer = await getCurrentUser();
  const user = getUserByUsername(username);
  if (!user) notFound();
  const threads = getThreads().filter((t) => t.authorId === user.id);
  const isSelf = viewer?.id === user.id;
  const isFollowing = viewer ? user.followers.includes(viewer.id) : false;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={viewer} />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 space-y-4">
        <Card>
          <div className="flex items-start gap-4 flex-wrap">
            <Avatar src={user.avatar} alt={user.username} size={80} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold">{user.username}</h1>
                {user.role !== "user" && <Badge color="#dc2626">{user.role}</Badge>}
                {user.badges.map((b) => <Badge key={b.id} color={b.color}>{b.name}</Badge>)}
              </div>
              <p className="text-muted text-sm mt-1">{user.bio || "No bio yet."}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted flex-wrap">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Joined {timeAgo(user.joinDate)}</span>
                <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {user.postCount} posts</span>
                <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5" /> {formatNumber(user.reputation)} rep</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {user.followers.length} followers</span>
              </div>
            </div>
            <div className="flex gap-2">
              {isSelf ? (
                <Link href="/settings"><Button variant="secondary" size="sm">Edit profile</Button></Link>
              ) : viewer ? (
                <FollowButton targetId={user.id} initial={isFollowing} />
              ) : null}
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold mb-3">Recent Threads</h2>
          <div className="space-y-2">
            {threads.length === 0 && <p className="text-muted text-sm">No threads yet.</p>}
            {threads.map((t) => (
              <Link key={t.id} href={`/thread/${t.id}`} className="block p-2 rounded-lg hover:bg-card-hover">
                <div className="text-sm font-medium">{t.title}</div>
                <div className="text-xs text-muted mt-0.5">{timeAgo(t.createdAt)} · {t.likes.length - t.dislikes.length} score</div>
              </Link>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}