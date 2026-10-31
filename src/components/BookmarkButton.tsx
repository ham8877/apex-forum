"use client";
import { useState } from "react";
import { Bookmark } from "lucide-react";

export default function BookmarkButton({ threadId, initial }: { threadId: string; initial: boolean }) {
  const [bookmarked, setBookmarked] = useState(initial);
  const toggle = async () => {
    const res = await fetch("/api/bookmarks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ threadId }) });
    const data = await res.json();
    if (res.ok) setBookmarked(data.bookmarked);
    else alert("Please log in.");
  };
  return (
    <button onClick={toggle} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-colors ${bookmarked ? "bg-accent/10 border-accent text-accent" : "border-border text-muted hover:text-foreground"}`}>
      <Bookmark className="w-4 h-4" /> {bookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
}