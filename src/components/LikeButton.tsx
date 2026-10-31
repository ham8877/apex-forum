"use client";
import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import Button from "@/components/ui/Button";

export default function LikeButton({
  target, id, initialLikes, initialDislikes, userId,
}: { target: "thread" | "comment"; id: string; initialLikes: string[]; initialDislikes: string[]; userId: string | null }) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [loading, setLoading] = useState(false);

  const act = async (kind: "like" | "dislike") => {
    if (!userId) { alert("Please log in to vote."); return; }
    setLoading(true);
    const res = await fetch("/api/vote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ target, id, kind }) });
    const data = await res.json();
    setLoading(false);
    if (res.ok) { setLikes(data.likes); setDislikes(data.dislikes); }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => act("like")} disabled={loading} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors ${userId && likes.includes(userId) ? "bg-green-900/30 border-green-700 text-green-400" : "border-border text-muted hover:text-foreground hover:border-accent/40"}`}>
        <ThumbsUp className="w-4 h-4" /> {likes.length}
      </button>
      <button onClick={() => act("dislike")} disabled={loading} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors ${userId && dislikes.includes(userId) ? "bg-red-900/30 border-red-700 text-red-400" : "border-border text-muted hover:text-foreground hover:border-accent/40"}`}>
        <ThumbsDown className="w-4 h-4" /> {dislikes.length}
      </button>
    </div>
  );
}