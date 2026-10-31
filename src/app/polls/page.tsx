import { getCurrentUser } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { getPolls } from "@/lib/data";
import PollCard from "@/components/PollCard";

export default async function PollsPage() {
  const user = await getCurrentUser();
  const polls = getPolls();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold">Daily Polls</h1>
        {polls.map((p) => <PollCard key={p.id} poll={p} userId={user?.id ?? null} />)}
      </main>
    </div>
  );
}