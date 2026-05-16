"use client";

import { ReactLenis } from "lenis/react";

/**
 * Audit Fix: 
 * 1. Removed manual Lenis initialization to prevent dual instances (Memory Leak).
 * 2. Relying on ReactLenis's internal RAF management for 100% clean lifecycle.
 * 3. Standardized easing for a consistent "Sovereign" feel.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.5, 
        smoothWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      }}
    >
      {children}
    </ReactLenis>
  );
}
