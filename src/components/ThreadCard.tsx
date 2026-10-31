import Link from "next/link";
import { timeAgo, formatNumber } from "@/lib/utils";
import { getUserById, getCategoryById } from "@/lib/data";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { ThumbsUp, ThumbsDown, Eye, MessageSquare } from "lucide-react";

export default function ThreadCard({ thread }: { thread: any }) {
  const author = getUserById(thread.authorId);
  const cat = getCategoryById(thread.categoryId);
  const score = thread.likes.length - thread.dislikes.length;
  const replyCount = 0;
  return (
    <Link href={`/thread/${thread.id}`} className="block group">
      <div className="bg-card border border-border rounded-xl p-5 hover:bg-card-hover hover:border-accent/50 transition-all duration-200 hover:-translate-y-0.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.5)]">
        <div className="flex items-start gap-4">
          <Avatar src={author?.avatar} alt={author?.username} size={44} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              {thread.pinned && <Badge color="#dc2626">Pinned</Badge>}
              {cat && <Badge color={cat.color}>{cat.name}</Badge>}
            </div>
            <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 text-[15px]">{thread.title}</h3>
            <p className="text-sm text-muted mt-1 line-clamp-2 leading-relaxed">{thread.content}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted flex-wrap">
              <span className="font-medium text-foreground/90">{author?.username}</span>
              <span className="flex items-center gap-1">{timeAgo(thread.createdAt)}</span>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {formatNumber(thread.views)}</span>
              <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> {score}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}