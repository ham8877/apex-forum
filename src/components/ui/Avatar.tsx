import React from "react";
import { cn } from "@/lib/utils";

export default function Avatar({ src, alt, size = 32, className }: { src?: string; alt?: string; size?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
      alt={alt || "avatar"}
      width={size}
      height={size}
      className={cn("rounded-full bg-card border border-border object-cover", className)}
      style={{ width: size, height: size }}
    />
  );
}