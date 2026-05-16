"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

/**
 * High-Performance Custom Cursor Engine (Sovereign Grade)
 * 1. Uses GSAP Ticker for frame-perfect updates (Zero Lag).
 * 2. Implements interactive scaling for links and buttons.
 * 3. Forced pointer-events isolation to prevent input blocking.
 */
export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  
  // Track position without triggering re-renders
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return;

    // Reset initial positions to prevent jump
    gsap.set([cursorRef.current, followerRef.current], { 
      xPercent: -50, 
      yPercent: -50,
      opacity: 0 
    });

    const xSetCursor = gsap.quickSetter(cursorRef.current, "x", "px");
    const ySetCursor = gsap.quickSetter(cursorRef.current, "y", "px");
    const xSetFollower = gsap.quickSetter(followerRef.current, "x", "px");
    const ySetFollower = gsap.quickSetter(followerRef.current, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Show cursor on first move
      gsap.to([cursorRef.current, followerRef.current], { opacity: 1, duration: 0.3 });

      // Event Delegation for Interactive States
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [role='button']");
      
      if (isInteractive) {
        gsap.to(cursorRef.current, { scale: 4, backgroundColor: "rgba(197, 164, 126, 0.2)", duration: 0.3, overwrite: "auto" });
        gsap.to(followerRef.current, { scale: 1.5, borderColor: "rgba(197, 164, 126, 1)", duration: 0.3, overwrite: "auto" });
      } else {
        gsap.to(cursorRef.current, { scale: 1, backgroundColor: "#C5A47E", duration: 0.3, overwrite: "auto" });
        gsap.to(followerRef.current, { scale: 1, borderColor: "#C5A47E", duration: 0.3, overwrite: "auto" });
      }
    };

    // Ticker for smooth follow effect (Interpolation)
    const tick = () => {
      const dt = 0.15; // Follow speed
      delayedMouse.current.x += (mouse.current.x - delayedMouse.current.x) * dt;
      delayedMouse.current.y += (mouse.current.y - delayedMouse.current.y) * dt;

      xSetCursor(mouse.current.x);
      ySetCursor(mouse.current.y);
      xSetFollower(delayedMouse.current.x);
      ySetFollower(delayedMouse.current.y);
    };

    gsap.ticker.add(tick);
    window.addEventListener("mousemove", onMouseMove);

    const onMouseLeaveWindow = () => {
      gsap.to([cursorRef.current, followerRef.current], { opacity: 0, duration: 0.3 });
    };

    window.addEventListener("mouseleave", onMouseLeaveWindow);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mouseleave", onMouseLeaveWindow);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div 
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference" 
      />
      <div 
        ref={followerRef}
        className="cursor-follower fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[9998] mix-blend-difference" 
      />
    </>
  );
}
