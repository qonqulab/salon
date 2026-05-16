"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSalon } from "@/context/SalonContext";

export default function Hero() {
  const { salonName } = useSalon();
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.fromTo(
        ".hero-img-overlay",
        { scaleY: 1 },
        { scaleY: 0, duration: 1.5, ease: "power4.inOut", delay: 4 }
      );
      
      gsap.fromTo(
        ".hero-img",
        { scale: 1.2 },
        { scale: 1, duration: 2, ease: "power2.out", delay: 4 }
      );

      // Text reveal
      gsap.fromTo(
        ".hero-title span",
        { y: "100%" },
        { y: 0, duration: 1.2, stagger: 0.1, ease: "power4.out", delay: 4.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="hero-img-overlay absolute inset-0 z-10 bg-background origin-top" />
        <Image
          src="/images/hero.png"
          alt="Luxury Salon Interior"
          fill
          priority
          sizes="100vw"
          className="hero-img object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-black/20 z-[5]" />
      </div>

      <div className="relative z-20 h-full flex flex-col justify-end container-ed pb-12 md:pb-20">
        <div className="max-w-4xl">
          <h1 className="hero-title serif text-white mix-blend-difference leading-[0.85] uppercase" style={{ fontSize: 'clamp(2.5rem, 18vw, 10rem)' }}>
            <div className="overflow-hidden">
              <span className="inline-block whitespace-nowrap">{salonName}</span>
            </div>
          </h1>
          <p className="mt-6 md:mt-8 text-white/80 max-w-[280px] md:max-w-md serif tracking-widest text-[9px] md:text-sm uppercase leading-relaxed">
            Redefining the essence of aesthetic living through meticulous design and hospitality.
          </p>
        </div>
      </div>
      
      {/* Vertical Scroll Indicator - Awwwards Style */}
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-10 text-white mix-blend-difference">
          <span 
            className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] opacity-40 whitespace-nowrap"
            style={{ writingMode: 'vertical-lr' }}
          >
            Scroll to explore
          </span>
          <div className="h-20 w-[1px] bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-full bg-white h-1/2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
