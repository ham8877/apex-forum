"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";

export default function MessagesPage() {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [to, setTo] = useState("");
  const [content, setContent] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [ready, setReady] = useState(false);

  const load = async () => {
    try {
      const meRes = await fetch("/api/me");
      const me = await meRes.json();
      setUser(me.user);
      if (!me.user) { setReady(true); return; }
      try {
        const msgsRes = await fetch("/api/messages");
        const msgs = await msgsRes.json();
        setMessages(msgs.messages || []);
      } catch (e) { console.error("msgs err", e); }
      try {
        const usRes = await fetch("/api/users");
        const us = await usRes.json();
        setUsers(us.users || []);
      } catch (e) { console.error("users err", e); }
    } catch (e) {
      console.error("load err", e);
    } finally {
      setReady(true);
    }
  };

  useEffect(() => { load(); }, []);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !content.trim()) return;
    const res = await fetch("/api/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ toId: to, content }) });
    if (res.ok) { setContent(""); load(); }
  };

  if (!ready) return (
    <div className="min-h-screen flex flex-col"><Navbar user={null} /><main className="flex-1 flex items-center justify-center"><p className="text-muted">Loading...</p></main></div>
  );
  if (!user) return (
    <div className="min-h-screen flex flex-col"><Navbar user={null} /><main className="flex-1 flex items-center justify-center"><Card><p className="text-muted">Please log in.</p><Link href="/login"><Button className="mt-3">Log in</Button></Link></Card></main></div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold">Messages</h1>
        <Card>
          <h2 className="font-semibold mb-3">Compose</h2>
          <form onSubmit={send} className="space-y-3">
            <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm">
              <option value="">Select recipient...</option>
              {users.filter((u) => u.id !== user.id).map((u) => <option key={u.id} value={u.id}>{u.username}</option>)}
            </select>
            <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Message..." rows={3} />
            <Button type="submit">Send</Button>
          </form>
        </Card>
        <Card>
          <h2 className="font-semibold mb-3">Inbox</h2>
          <div className="space-y-2">
            {messages.length === 0 && <p className="text-muted text-sm">No messages.</p>}
            {messages.map((m) => {
              const other = users.find((u) => u.id === (m.fromId === user.id ? m.toId : m.fromId));
              return (
                <div key={m.id} className="p-2 rounded-lg border border-border">
                  <div className="text-xs text-muted">{other?.username || "Unknown"} · {new Date(m.createdAt).toLocaleString()}</div>
                  <div className="text-sm mt-1">{m.content}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </main>
    </div>
  );
}