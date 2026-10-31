"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { getCategories } from "@/lib/data";

export default function NewThreadPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState(sp.get("cat") || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const categories = getCategories();

  useEffect(() => {
    fetch("/api/me").then((r) => r.json()).then((d) => setUser(d.user)).catch(() => setUser(null));
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) { setError("Select a category"); return; }
    setLoading(true); setError("");
    const res = await fetch("/api/threads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, content, categoryId }) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Failed"); return; }
    router.push(`/thread/${data.thread.id}`); router.refresh();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar user={null} />
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="max-w-md text-center">
            <p className="text-muted mb-4">You must be logged in to create a thread.</p>
            <Link href="/login"><Button>Log in</Button></Link>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <Card>
          <h1 className="text-2xl font-bold mb-4">New Thread</h1>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs text-muted mb-1 block">Category</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent">
                <option value="">Select category...</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Thread title" required minLength={5} maxLength={120} />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Content</label>
              <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post..." rows={8} required minLength={10} />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex gap-2 justify-end">
              <Link href="/forum"><Button variant="ghost">Cancel</Button></Link>
              <Button type="submit" disabled={loading}>{loading ? "Posting..." : "Post Thread"}</Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}