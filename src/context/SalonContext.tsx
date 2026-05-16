"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface SalonContextType {
  salonName: string;
  setSalonName: (name: string) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export function SalonProvider({ children }: { children: ReactNode }) {
  const [salonName, setSalonName] = useState("Qonqu");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("salon-theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("salon-theme", newTheme);
    // Direct DOM manipulation for instant feedback and robustness
    document.documentElement.setAttribute("data-theme", newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  return (
    <SalonContext.Provider value={{ salonName, setSalonName, theme, toggleTheme }}>
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
