"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { getCurrentUser } from "@/lib/auth";

// server wrapper not needed; fetch user client-side via cookie not available. Pass null.
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const res = await fetch("/api/auth/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) { setError(data.error || "Login failed"); return; }
    router.push("/"); router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={null} />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
          <p className="text-muted text-sm mb-6">Log in to your Apex Forum account.</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-xs text-muted mb-1 block">Email</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Log in"}</Button>
          </form>
          <p className="text-sm text-muted mt-4 text-center">
            No account? <Link href="/register" className="text-accent hover:underline">Sign up</Link>
          </p>
          <div className="mt-6 pt-4 border-t border-border text-xs text-muted">
            Demo accounts: admin@apex.gg / admin123 · ironwill@apex.gg / password
          </div>
        </Card>
      </main>
    </div>
  );
}