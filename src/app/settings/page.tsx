"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/me").then((r) => r.json()).then((d) => {
      setUser(d.user);
      if (d.user) { setUsername(d.user.username); setBio(d.user.bio || ""); setAvatar(d.user.avatar || ""); }
    });
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setMsg("");
    const res = await fetch("/api/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, bio, avatar }) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setMsg(data.error || "Failed"); return; }
    setMsg("Saved!");
    setUser(data.user);
  };

  if (!user) return (
    <div className="min-h-screen flex flex-col"><Navbar user={null} /><main className="flex-1 flex items-center justify-center"><Card><p className="text-muted">Please log in.</p><Link href="/login"><Button className="mt-3">Log in</Button></Link></Card></main></div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
        <Card>
          <form onSubmit={save} className="space-y-4">
            <div>
              <label className="text-xs text-muted mb-1 block">Username</label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Avatar URL</label>
              <Input value={avatar} onChange={(e) => setAvatar(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Bio</label>
              <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
            </div>
            {msg && <p className="text-sm text-accent">{msg}</p>}
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save changes"}</Button>
          </form>
        </Card>
      </main>
    </div>
  );
}