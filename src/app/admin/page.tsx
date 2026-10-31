import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { getUsers, getThreads, getReports, getCategories, getAllComments } from "@/lib/data";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Shield, Users, MessageSquare, AlertTriangle, FolderPlus } from "lucide-react";
import AdminActions from "@/components/AdminActions";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/");
  const users = getUsers();
  const threads = getThreads();
  const comments = getAllComments();
  const reports = getReports();
  const categories = getCategories();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6 text-accent" /> Admin Dashboard</h1>

        {/* Analytics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Card><div className="text-2xl font-bold">{users.length}</div><div className="text-xs text-muted">Users</div></Card>
          <Card><div className="text-2xl font-bold">{threads.length}</div><div className="text-xs text-muted">Threads</div></Card>
          <Card><div className="text-2xl font-bold">{reports.filter(r=>!r.resolved).length}</div><div className="text-xs text-muted">Open Reports</div></Card>
          <Card><div className="text-2xl font-bold">{categories.length}</div><div className="text-xs text-muted">Categories</div></Card>
        </div>

        {/* Reports */}
        <Card>
          <h2 className="font-semibold mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-accent" /> Reported Content</h2>
          {reports.length === 0 && <p className="text-muted text-sm">No reports.</p>}
          <div className="space-y-2">
            {reports.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-2 rounded-lg border border-border">
                <div className="text-sm">
                  <Badge color={r.resolved ? "#22c55e" : "#dc2626"}>{r.resolved ? "Resolved" : "Open"}</Badge>
                  <span className="ml-2">{r.targetType} · {r.targetId} · {r.reason}</span>
                </div>
                {!r.resolved && <AdminActions type="resolve" id={r.id} />}
              </div>
            ))}
          </div>
        </Card>

        {/* Users */}
        <Card>
          <h2 className="font-semibold mb-3 flex items-center gap-2"><Users className="w-4 h-4 text-accent" /> Manage Users</h2>
          <div className="space-y-2">
            {users.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-2 rounded-lg border border-border flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <Avatar src={u.avatar} alt={u.username} size={32} />
                  <div>
                    <div className="text-sm font-medium">{u.username} <Badge color="#737373">{u.role}</Badge></div>
                    <div className="text-xs text-muted">{u.email} · {u.banned ? "BANNED" : u.suspended ? "SUSPENDED" : "active"}</div>
                  </div>
                </div>
                {u.role !== "admin" && (
                  <div className="flex gap-2 flex-wrap">
                    <AdminActions type="ban" id={u.id} active={u.banned} />
                    <AdminActions type="suspend" id={u.id} active={u.suspended} />
                    <AdminActions type="deleteUser" id={u.id} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Threads */}
        <Card>
          <h2 className="font-semibold mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-accent" /> Manage Threads</h2>
          <div className="space-y-2">
            {threads.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-2 rounded-lg border border-border gap-2">
                <div className="min-w-0 flex-1">
                  <Link href={`/thread/${t.id}`} className="text-sm font-medium hover:text-accent truncate block">{t.title}</Link>
                  <div className="text-xs text-muted">{t.views} views</div>
                </div>
                <AdminActions type="deleteThread" id={t.id} />
              </div>
            ))}
          </div>
        </Card>

        {/* Comments */}
        <Card>
          <h2 className="font-semibold mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-accent" /> Manage Comments</h2>
          <div className="space-y-2">
            {comments.slice(0, 20).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-2 rounded-lg border border-border gap-2">
                <div className="min-w-0 flex-1">
                  <div className="text-sm truncate">{c.content}</div>
                  <div className="text-xs text-muted">{c.authorId} · {c.threadId}</div>
                </div>
                <AdminActions type="deleteComment" id={c.id} />
              </div>
            ))}
            {comments.length === 0 && <p className="text-muted text-sm">No comments.</p>}
          </div>
        </Card>

        {/* Categories */}
        <Card>
          <h2 className="font-semibold mb-3 flex items-center gap-2"><FolderPlus className="w-4 h-4 text-accent" /> Categories</h2>
          <div className="space-y-2">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-2 rounded-lg border border-border">
                <span className="text-sm">{c.name} <span className="text-muted text-xs">({c.threadCount})</span></span>
                <AdminActions type="deleteCategory" id={c.id} />
              </div>
            ))}
          </div>
          <AdminActions type="createCategory" />
        </Card>
      </main>
    </div>
  );
}