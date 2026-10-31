"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AdminActions({ type, id, active }: { type: string; id?: string; active?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");

  const call = async (action: string, payload: any) => {
    setLoading(true);
    await fetch("/api/admin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, ...payload }) });
    setLoading(false);
    router.refresh();
  };

  if (type === "ban") {
    return <Button size="sm" variant={active ? "danger" : "secondary"} disabled={loading} onClick={() => call("ban", { userId: id, banned: !active })}>{active ? "Unban" : "Ban"}</Button>;
  }
  if (type === "suspend") {
    return <Button size="sm" variant={active ? "danger" : "secondary"} disabled={loading} onClick={() => call("suspend", { userId: id, suspended: !active })}>{active ? "Unsuspend" : "Suspend"}</Button>;
  }
  if (type === "deleteThread") {
    return <Button size="sm" variant="danger" disabled={loading} onClick={() => { if (confirm("Delete thread?")) call("deleteThread", { threadId: id }); }}>Delete</Button>;
  }
  if (type === "deleteComment") {
    return <Button size="sm" variant="danger" disabled={loading} onClick={() => { if (confirm("Delete comment?")) call("deleteComment", { commentId: id }); }}>Delete</Button>;
  }
  if (type === "deleteUser") {
    return <Button size="sm" variant="danger" disabled={loading} onClick={() => { if (confirm("Delete user and their content?")) call("deleteUser", { userId: id }); }}>Delete User</Button>;
  }
  if (type === "resolve") {
    return <Button size="sm" variant="secondary" disabled={loading} onClick={() => call("resolveReport", { reportId: id })}>Resolve</Button>;
  }
  if (type === "deleteCategory") {
    return <Button size="sm" variant="danger" disabled={loading} onClick={() => { if (confirm("Delete category?")) call("deleteCategory", { categoryId: id }); }}>Delete</Button>;
  }
  if (type === "createCategory") {
    return (
      <div className="flex gap-2 mt-3">
        {showForm ? (
          <>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Category name" />
            <Button size="sm" disabled={loading} onClick={() => { call("createCategory", { name }); setShowForm(false); setName(""); }}>Create</Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
          </>
        ) : (
          <Button size="sm" variant="secondary" onClick={() => setShowForm(true)}>+ Add Category</Button>
        )}
      </div>
    );
  }
  return null;
}