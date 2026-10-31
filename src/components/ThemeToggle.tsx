"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("apex-theme");
    if (saved === "light") { document.documentElement.classList.add("light"); setLight(true); }
  }, []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    if (next) { document.documentElement.classList.add("light"); localStorage.setItem("apex-theme", "light"); }
    else { document.documentElement.classList.remove("light"); localStorage.setItem("apex-theme", "dark"); }
  };
  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-card text-muted hover:text-foreground" aria-label="Toggle theme">
      {light ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
    </button>
  );
}