"use client";

import Image from "next/image";
import { useSalon } from "@/context/SalonContext";

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

/**
 * Clean Editorial Menu Section
 * 1. Removed all scroll pinning and GSAP gating for a fluid, natural scroll experience.
 * 2. High-fidelity vertical stacking with immersive background parallax.
 * 3. Standardized responsive typography and card layout for zero-flicker stability.
 */
export default function MenuSection() {
  const { salonName } = useSalon();

  return (
    <section id="menu" className="bg-background">
      {categories.map((cat, idx) => (
        <div 
          key={idx} 
          className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-32"
        >
          {/* Immersive Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="100vw"
              className="object-cover brightness-[0.25] grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px]" />
          </div>

          <div className="relative z-10 container-ed w-full">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-32 items-center">
              <div className="lg:w-1/2 w-full text-center lg:text-left">
                <span className="serif text-accent tracking-[1em] text-[8px] md:text-[10px] uppercase mb-8 block">0{idx + 1} — Selection</span>
                <h2 className="serif text-4xl md:text-7xl lg:text-9xl text-white leading-none mb-10">
                  {cat.name.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </h2>
                <div className="w-20 h-[1px] bg-accent/40 mx-auto lg:mx-0" />
              </div>

              <div className="lg:w-1/2 w-full max-w-2xl">
                <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-16 border border-white/10 rounded-sm shadow-2xl">
                  <div className="grid grid-cols-1 gap-8 md:gap-12">
                    {cat.items.map((item, i) => (
                      <div key={i} className="group flex justify-between items-end border-b border-white/5 pb-6">
                        <div className="max-w-[70%] text-left">
                          <h4 className="serif text-xl md:text-3xl text-white mb-2">{item.name}</h4>
                          <span className="text-[8px] md:text-[10px] text-white/40 uppercase tracking-[0.4em]">{item.duration}</span>
                        </div>
                        <div className="text-right">
                          <span className="serif text-2xl md:text-4xl text-accent">{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-center mt-12 italic">
                    "Tailored for the sovereign individual."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Background Index Decor */}
          <div className="absolute bottom-10 right-10 serif text-white/5 text-[20vw] pointer-events-none select-none italic">
            0{idx + 1}
          </div>
        </div>
      ))}
    </section>
  );
}
