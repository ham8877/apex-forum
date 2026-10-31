"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const res = await fetch("/api/auth/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, email, password }) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Registration failed"); return; }
    router.push("/"); router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={null} />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-1">Create account</h1>
          <p className="text-muted text-sm mb-6">Join the Apex Forum community.</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs text-muted mb-1 block">Username</label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="coolname" required />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="min 6 chars" required />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating..." : "Sign up"}</Button>
          </form>
          <p className="text-sm text-muted mt-4 text-center">
            Already have an account? <Link href="/login" className="text-accent hover:underline">Log in</Link>
          </p>
        </Card>
      </main>
    </div>
  );
}