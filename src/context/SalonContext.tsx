"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useMemo, useCallback } from "react";

interface SalonContextType {
  salonName: string;
  setSalonName: (name: string) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export function SalonProvider({ children }: { children: ReactNode }) {
  const [salonName, setSalonName] = useState("Qonqu Salon");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("salon-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      localStorage.setItem("salon-theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      document.body.setAttribute("data-theme", newTheme);
      return newTheme;
    });
  }, []);

  const value = useMemo(() => ({
    salonName,
    setSalonName,
    theme,
    toggleTheme
  }), [salonName, theme, toggleTheme]);

  return (
    <SalonContext.Provider value={value}>
      {children}
    </SalonContext.Provider>
  );
}

export function useSalon() {
  const context = useContext(SalonContext);
  if (context === undefined) {
    throw new Error("useSalon must be used within a SalonProvider");
  }
  return context;
}
