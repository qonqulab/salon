"use client";

import { motion } from "framer-motion";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  href?: string;
}

export default function Button({ 
  children, 
  onClick, 
  className = "", 
  type = "button",
  disabled = false,
  href
}: ButtonProps) {
  const content = (
    <div className="relative overflow-hidden group border border-current/20 px-8 py-4 bg-transparent transition-colors duration-500 hover:border-accent">
      {/* Liquid Fill - Only enabled for desktop hover */}
      <div className="absolute inset-0 translate-y-full bg-accent transition-transform duration-500 ease-[0.76, 0, 0.24, 1] hidden md:block group-hover:translate-y-0" />
      
      {/* Text - Inverts color on hover for maximum contrast against accent gold */}
      <span className="relative z-10 block serif text-[10px] uppercase tracking-[0.4em] transition-colors duration-500 group-hover:text-[#121212]">
        {children}
      </span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {content}
    </button>
  );
}
