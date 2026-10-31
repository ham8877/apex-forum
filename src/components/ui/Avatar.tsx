import React from "react";
import { cn } from "@/lib/utils";

const COLORS = ["#dc2626", "#737373", "#525252", "#a3a3a3", "#404040"];

export default function Avatar({ src, alt, size = 32, className }: { src?: string; alt?: string; size?: number; className?: string }) {
  const name = alt || "U";
  const initial = name.charAt(0).toUpperCase();
  const color = COLORS[name.charCodeAt(0) % COLORS.length];
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || "avatar"}
        width={size}
        height={size}
        className={cn("rounded-full bg-card border border-border object-cover", className)}
        style={{ width: size, height: size }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    );
  }
  return (
    <div
      className={cn("rounded-full border border-border flex items-center justify-center font-semibold text-white", className)}
      style={{ width: size, height: size, background: color, fontSize: size * 0.4 }}
      aria-label={alt}
    >
      {initial}
    </div>
  );
}