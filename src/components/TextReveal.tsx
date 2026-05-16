"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TextReveal({ children, className = "" }: { children: string, className?: string }) {
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal-line", {
        y: "100%",
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 90%",
        },
      });
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={textRef} className={`overflow-hidden ${className}`}>
      <div className="reveal-line inline-block">
        {children}
      </div>
    </div>
  );
}
