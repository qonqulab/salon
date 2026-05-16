"use client";

import { useEffect } from "react";
import { useSalon } from "@/context/SalonContext";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useSalon();

  useEffect(() => {
    // Sync theme on mount and changes
    const applyTheme = (t: string) => {
      document.documentElement.setAttribute("data-theme", t);
      document.body.setAttribute("data-theme", t);
    };

    applyTheme(theme);
    
    // Final reveal - ensures zero-flicker entrance
    document.body.classList.remove("opacity-0");
    document.body.classList.add("opacity-100");
    
    // Fallback for initial load from localStorage
    const saved = localStorage.getItem("salon-theme");
    if (saved) applyTheme(saved);

    // Force a small repaint
    const _ = document.body.offsetHeight;
  }, [theme]);

  return <>{children}</>;
}
