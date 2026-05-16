"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return;

    const cursor = document.querySelector(".custom-cursor");
    const follower = document.querySelector(".cursor-follower");

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", checkMobile);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div className="custom-cursor fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
      <div className="cursor-follower fixed top-0 left-0 w-10 h-10 border border-accent rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block" />
    </>
  );
}
