"use client";
import { useState } from "react";
import { Flag } from "lucide-react";

export default function ReportButton({ targetType, targetId }: { targetType: "thread" | "comment" | "user"; targetId: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [done, setDone] = useState(false);
  const submit = async () => {
    if (!reason.trim()) return;
    const res = await fetch("/api/report", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ targetType, targetId, reason }) });
    if (res.ok) { setDone(true); setOpen(false); }
    else alert("Please log in to report.");
  };
  if (done) return <span className="text-xs text-muted">Reported</span>;
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="text-muted hover:text-red-400 transition-colors"><Flag className="w-4 h-4" /></button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-card border border-border rounded-xl p-3 shadow-xl z-10">
          <textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason..." className="w-full bg-background border border-border rounded-lg p-2 text-sm" rows={3} />
          <button onClick={submit} className="mt-2 w-full bg-accent text-white text-sm rounded-lg py-1.5">Submit report</button>
        </div>
      )}
    </div>
  );
}