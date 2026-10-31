import React from "react";
import { cn } from "@/lib/utils";

export default function Card({ children, className, hover = false, ...props }: React.HTMLAttributes<HTMLDivElement> & { hover?: boolean }) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_8px_24px_-12px_rgba(0,0,0,0.6)] transition-all duration-200",
        hover && "hover:bg-card-hover hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-[0_1px_0_0_rgba(255,255,255,0.05)_inset,0_12px_32px_-12px_rgba(220,38,38,0.25)] cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}