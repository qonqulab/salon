"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, User, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { useSalon } from "@/context/SalonContext";

export default function Navbar() {
  const { salonName, theme, toggleTheme } = useSalon();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Philosophy", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Menu", href: "#menu" },
    { name: "Artisans", href: "#team" },
    { name: "Journal", href: "#journal" },
    { name: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const transition = { duration: 0.8, ease: [0.76, 0, 0.24, 1] as any };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] py-6 px-6 md:px-12 flex justify-between items-center bg-background/10 backdrop-blur-md border-b border-current/5 text-foreground transition-colors duration-500">
        {/* Left Side: Menu Trigger */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-4 cursor-pointer group"
          aria-label="Open Menu"
        >
          <div className="flex flex-col gap-1.5 w-7">
            <div className="h-[1.5px] w-full bg-current transition-transform duration-300 group-hover:scale-x-110 origin-left" />
            <div className="h-[1.5px] w-5 bg-current transition-transform duration-300 group-hover:w-full" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-medium hidden md:block">Menu</span>
        </button>

        {/* Center: Logo */}
        <div
          className="absolute left-1/2 -translate-x-1/2 serif tracking-[0.4em] font-medium cursor-pointer whitespace-nowrap"
          style={{ fontSize: 'clamp(0.9rem, 3vw, 1.3rem)' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {salonName}
        </div>

        {/* Right Side: Contact & Theme */}
        <div className="flex items-center gap-6 md:gap-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleTheme();
            }}
            className="flex items-center gap-2 group"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <div className="relative h-4 w-4 overflow-hidden">
              <motion.div
                animate={{ y: theme === "dark" ? 0 : -20 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="flex flex-col items-center"
              >
                <Moon size={14} className="mb-2" />
                <Sun size={14} />
              </motion.div>
            </div>
            <span className="text-[8px] uppercase tracking-[0.4em] font-medium transition-opacity hidden sm:block">
              {theme === "dark" ? "Dark Mode" : "Light Mode"}
            </span>
          </button>

          <div className="flex items-center gap-3 cursor-pointer group">
            <a href="#booking" className="text-[10px] uppercase tracking-[0.4em] font-medium hidden md:block">Contact</a>
            <User size={16} strokeWidth={2} className="group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div key="nav-overlay" className="fixed inset-0 z-[200] flex">
            {/* Staggered Column Reveal - Now using bg-background variable */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{ ...transition, delay: i * 0.05 }}
                className="h-full flex-1 bg-background origin-top will-change-transform"
                style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
              />
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-[205] flex flex-col items-center justify-center text-foreground"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 md:top-10 md:right-12 p-4 border border-current/10 rounded-full hover:bg-foreground hover:text-background transition-all duration-500"
              >
                <X size={24} />
              </button>

              <div className="w-full max-w-7xl px-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-20">
                <div className="hidden md:block w-1/3">
                  <span className="serif text-accent tracking-[0.4em] text-[10px] uppercase mb-10 block">Explore</span>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm opacity-60 max-w-xs serif italic">
                      "Precision is the soul of beauty."
                    </p>
                    <span className="not-italic text-[8px] uppercase tracking-[0.3em] opacity-40">— {salonName} Studio</span>
                  </div>
                </div>

                <ul className="flex flex-col items-center md:items-end gap-1 md:gap-2">
                  {navLinks.map((link, idx) => (
                    <motion.li
                      key={link.name}
                      initial={{ y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ delay: 0.2 + idx * 0.05, duration: 0.5, ease: "easeOut" }}
                      className="relative group h-[50px] md:h-[80px] overflow-hidden"
                    >
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="serif text-4xl md:text-7xl leading-none block transition-transform duration-500 group-hover:-translate-y-full"
                      >
                        {link.name}
                      </a>
                      {/* Secondary text only for desktop hover effect */}
                      <a
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="serif text-4xl md:text-7xl text-accent leading-none hidden md:block transition-transform duration-500 group-hover:-translate-y-full"
                      >
                        {link.name}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="absolute bottom-10 w-full px-10 flex flex-col md:flex-row justify-between items-end gap-10">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-8 text-[8px] md:text-[10px] uppercase tracking-[0.4em] opacity-40">
                    <span className="hover:opacity-100 cursor-pointer transition-opacity hover:text-accent">Instagram</span>
                    <span className="hover:opacity-100 cursor-pointer transition-opacity hover:text-accent">Journal</span>
                    <span className="hover:opacity-100 cursor-pointer transition-opacity hover:text-accent">Location</span>
                  </div>
                </div>
                <div className="serif text-[8px] md:text-[10px] tracking-[0.2em] opacity-30 text-right uppercase">
                  EST. 2026 — {salonName}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
