"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";

export default function FollowButton({ targetId, initial }: { targetId: string; initial: boolean }) {
  const [following, setFollowing] = useState(initial);
  const [loading, setLoading] = useState(false);
  const toggle = async () => {
    setLoading(true);
    const res = await fetch("/api/follow", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ targetId }) });
    const data = await res.json();
    setLoading(false);
    if (res.ok) setFollowing(data.following);
  };
  return (
    <Button variant={following ? "secondary" : "primary"} size="sm" onClick={toggle} disabled={loading}>
      {following ? "Following" : "Follow"}
    </Button>
  );
}