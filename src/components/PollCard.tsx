"use client";
import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { BarChart3 } from "lucide-react";

export default function PollCard({ poll, userId }: { poll: any; userId: string | null }) {
  const [pollState, setPollState] = useState(poll);
  const total = pollState.options.reduce((s: number, o: any) => s + o.votes.length, 0);
  const voted = userId ? pollState.options.some((o: any) => o.votes.includes(userId)) : false;

  const vote = async (optionId: string) => {
    if (!userId) { alert("Log in to vote."); return; }
    const res = await fetch("/api/polls/vote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pollId: poll.id, optionId }) });
    const data = await res.json();
    if (res.ok) setPollState(data.poll);
  };

  return (
    <Card>
      <h3 className="font-semibold mb-3 flex items-center gap-2"><BarChart3 className="w-4 h-4 text-accent" /> {pollState.question}</h3>
      <div className="space-y-2">
        {pollState.options.map((o: any) => {
          const pct = total > 0 ? Math.round((o.votes.length / total) * 100) : 0;
          const isMine = userId ? o.votes.includes(userId) : false;
          return (
            <button key={o.id} onClick={() => vote(o.id)} disabled={voted && !isMine} className={`w-full text-left p-3 rounded-lg border transition-colors ${isMine ? "border-accent bg-accent/10" : "border-border hover:border-accent/40"}`}>
              <div className="flex justify-between text-sm mb-1">
                <span>{o.text}</span>
                <span className="text-muted">{pct}%</span>
              </div>
              <div className="h-1.5 bg-card-hover rounded-full overflow-hidden">
                <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted mt-3">{total} votes</p>
    </Card>
  );
}