"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CommentForm({ threadId, parentId }: { threadId: string; parentId?: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true); setError("");
    const res = await fetch("/api/comments", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ threadId, content, parentId }) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Failed"); return; }
    setContent("");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write a reply..." rows={3} required />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <div className="flex justify-end">
        <Button type="submit" size="sm" disabled={loading}>{loading ? "Posting..." : "Post reply"}</Button>
      </div>
    </form>
  );
}