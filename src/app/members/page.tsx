import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Avatar from "@/components/ui/Avatar";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { getUsers } from "@/lib/data";
import { formatNumber } from "@/lib/utils";

export default async function MembersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const user = await getCurrentUser();
  const sp = await searchParams;
  const q = (sp?.q || "").toLowerCase();
  const members = getUsers().filter((u) => !u.banned && u.username.toLowerCase().includes(q));
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold">Members</h1>
        <form action="/members" method="get">
          <Input name="q" defaultValue={sp?.q} placeholder="Search members..." />
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {members.map((u) => (
            <Link key={u.id} href={`/profile/${u.username}`}>
              <Card hover className="flex items-center gap-3">
                <Avatar src={u.avatar} alt={u.username} size={44} />
                <div className="min-w-0">
                  <div className="font-medium">{u.username}</div>
                  <div className="text-xs text-muted">{formatNumber(u.reputation)} rep · {u.postCount} posts</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}