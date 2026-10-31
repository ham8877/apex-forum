import React from "react";
import { cn } from "@/lib/utils";

export default function Badge({ children, color = "#dc2626", className }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md border", className)}
      style={{ color, borderColor: color + "40", background: color + "15" }}
    >
      {children}
    </span>
  );
}