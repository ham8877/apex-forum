import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { getThreadById, getCommentsByThread, getUserById, getCategoryById, incrementViews } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import LikeButton from "@/components/LikeButton";
import BookmarkButton from "@/components/BookmarkButton";
import ReportButton from "@/components/ReportButton";
import AdminActions from "@/components/AdminActions";
import CommentForm from "@/components/CommentForm";
import { Eye, Trash2, Lock } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ThreadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const thread = getThreadById(id);
  if (!thread) notFound();
  incrementViews(id);
  const author = getUserById(thread.authorId);
  const cat = getCategoryById(thread.categoryId);
  const comments = getCommentsByThread(id);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 space-y-4">
        <Card>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {thread.pinned && <Badge color="#737373">Pinned</Badge>}
            {thread.locked && <Badge color="#6b7280">Locked</Badge>}
            {cat && <Badge color={cat.color}>{cat.name}</Badge>}
          </div>
          <h1 className="text-2xl font-bold">{thread.title}</h1>
          <div className="flex items-center gap-3 mt-3 text-sm text-muted">
            <Avatar src={author?.avatar} alt={author?.username} size={28} />
            <span className="font-medium text-foreground">{author?.username}</span>
            <span>·</span>
            <span>{timeAgo(thread.createdAt)}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {thread.views}</span>
          </div>
          <div className="prose-ascend mt-4 whitespace-pre-wrap text-foreground/90">{thread.content}</div>
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between flex-wrap gap-3">
            <LikeButton target="thread" id={thread.id} initialLikes={thread.likes} initialDislikes={thread.dislikes} userId={user?.id ?? null} />
            {user && <BookmarkButton threadId={thread.id} initial={user.bookmarks.includes(thread.id)} />}
            <ReportButton targetType="thread" targetId={thread.id} />
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold mb-4">Replies ({comments.length})</h2>
          <div className="space-y-4">
            {comments.length === 0 && <p className="text-muted text-sm">No replies yet. Be the first.</p>}
            {comments.map((c) => {
              const ca = getUserById(c.authorId);
              return (
                <div key={c.id} className="border-b border-border last:border-0 pb-4 last:pb-0">
                  <div className="flex items-start gap-3">
                    <Avatar src={ca?.avatar} alt={ca?.username} size={32} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">{ca?.username}</span>
                        <span className="text-muted text-xs">{timeAgo(c.createdAt)}</span>
                      </div>
                      <p className="text-sm text-foreground/90 mt-1 whitespace-pre-wrap">{c.content}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <LikeButton target="comment" id={c.id} initialLikes={c.likes} initialDislikes={c.dislikes} userId={user?.id ?? null} />
                        {user?.role === "admin" && <AdminActions type="deleteComment" id={c.id} />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            {user ? (
              thread.locked ? (
                <p className="text-muted text-sm flex items-center gap-2"><Lock className="w-4 h-4" /> This thread is locked.</p>
              ) : (
                <CommentForm threadId={thread.id} />
              )
            ) : (
              <p className="text-muted text-sm">Please <Link href="/login" className="text-accent hover:underline">log in</Link> to reply.</p>
            )}
          </div>
        </Card>
      </main>
    </div>
  );
}