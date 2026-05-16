"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useSalon } from "@/context/SalonContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = [
  {
    name: "Hair Design",
    image: "/images/treatment-1.png",
    items: [
      { name: "Architectural Cut", price: "$120", duration: "60 min" },
      { name: "Organic Coloring", price: "$250", duration: "120 min" },
      { name: "Sculptural Styling", price: "$90", duration: "45 min" },
    ]
  },
  {
    name: "Skin Therapy",
    image: "/images/treatment-2.png",
    items: [
      { name: "Botanical Facial", price: "$180", duration: "75 min" },
      { name: "Dermal Sculpting", price: "$320", duration: "90 min" },
      { name: "Oxygen Infusion", price: "$210", duration: "60 min" },
    ]
  },
  {
    name: "Aesthetic Rituals",
    image: "/images/products.png",
    items: [
      { name: "Full Body Alchemy", price: "$450", duration: "180 min" },
      { name: "Sensorial Escape", price: "$280", duration: "120 min" },
      { name: "Metabolic Reset", price: "$350", duration: "90 min" },
    ]
  }
];

export default function MenuSection() {
  const containerRef = useRef(null);
  const { salonName } = useSalon();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".menu-panel");
      
      // Master timeline with enhanced Awwwards-grade transition flags
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${panels.length * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1, // Kept the timing/scrub identical as requested
          anticipatePin: 1.5, // Smoother entry for high-refresh screens
          fastScrollEnd: true, // Prevents snapping on fast scrolls
          preventOverlaps: true, // Ensures zero jitter between triggers
        }
      });

      // Sequential Stacking - Logic unchanged to preserve perfect timing
      panels.forEach((panel: any, i: number) => {
        if (i > 0) {
          tl.fromTo(panel, 
            { clipPath: "inset(100% 0% 0% 0%)" },
            { 
              clipPath: "inset(0% 0% 0% 0%)", 
              ease: "none",
            },
            i
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="menu" className="relative h-screen bg-background overflow-hidden">
      {categories.map((cat, idx) => (
        <div 
          key={idx} 
          className={`menu-panel menu-panel-${idx} absolute inset-0 h-full w-full flex items-center justify-center overflow-hidden`}
          style={{ zIndex: idx + 1 }}
        >
          {/* Immersive Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="100vw"
              className="object-cover brightness-[0.25] grayscale-[30%]"
            />
            <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 container-ed w-full">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-center">
              <div className="lg:w-1/2">
                <span className="serif text-accent tracking-[1em] text-[8px] md:text-[10px] uppercase mb-8 block">0{idx + 1} — Selection</span>
                <h2 className="serif text-5xl md:text-8xl lg:text-9xl text-white leading-none mb-10">
                  {cat.name.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h2>
                <div className="w-20 h-[1px] bg-accent/40" />
              </div>

              <div className="lg:w-1/2 w-full max-w-2xl">
                <div className="bg-white/5 backdrop-blur-3xl p-10 md:p-16 border border-white/10 rounded-sm">
                  <div className="grid grid-cols-1 gap-10">
                    {cat.items.map((item, i) => (
                      <div key={i} className="group flex justify-between items-end border-b border-white/5 pb-6">
                        <div>
                          <h4 className="serif text-2xl md:text-3xl text-white mb-2">{item.name}</h4>
                          <span className="text-[10px] text-white/40 uppercase tracking-[0.4em]">{item.duration}</span>
                        </div>
                        <div className="text-right">
                          <span className="serif text-3xl md:text-4xl text-accent">{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/30 text-[10px] uppercase tracking-[0.4em] text-center mt-12 italic">
                    "Tailored for the sovereign individual."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Background Index */}
          <div className="absolute bottom-20 right-20 serif text-white/5 text-[15vw] pointer-events-none select-none italic">
            0{idx + 1}
          </div>
        </div>
      ))}
    </section>
  );
}
