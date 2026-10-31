import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { getNotificationsFor, markNotificationsRead } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import { Bell } from "lucide-react";

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) return null;
  const notifs = getNotificationsFor(user.id);
  markNotificationsRead(user.id);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Bell className="w-6 h-6 text-accent" /> Notifications</h1>
        <Card>
          {notifs.length === 0 && <p className="text-muted text-sm">No notifications.</p>}
          <div className="space-y-2">
            {notifs.map((n) => (
              <Link key={n.id} href={n.link} className={`block p-2 rounded-lg hover:bg-card-hover ${n.read ? "opacity-60" : ""}`}>
                <div className="text-sm">{n.text}</div>
                <div className="text-xs text-muted mt-0.5">{timeAgo(n.createdAt)}</div>
              </Link>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}