"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useSalon } from "@/context/SalonContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutSection() {
  const { salonName } = useSalon();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".reveal-up");
      
      items.forEach((item: any) => {
        gsap.fromTo(item, 
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1.5, 
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="relative py-40 bg-background text-foreground overflow-hidden">
      <div className="container-ed">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          {/* Contained Image - The 'Boutique' look */}
          <div className="w-full lg:w-1/2 aspect-[4/5] relative overflow-hidden shadow-2xl reveal-up">
            <Image
              src="/images/model.png"
              alt="Aesthetic Philosophy"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2s] hover:scale-110"
            />
          </div>

          {/* Clean Editorial Content */}
          <div className="w-full lg:w-1/2">
            <span className="serif text-accent tracking-[0.8em] text-[10px] md:text-xs uppercase mb-12 block reveal-up">The Philosophy</span>
            
            <h2 className="serif text-4xl md:text-7xl mb-12 lg:mb-16 leading-tight reveal-up">
              Transcending <br /> 
              <span className="italic">Traditional</span> <br /> 
              Beauty.
            </h2>
            
            <div className="max-w-xl space-y-8 md:space-y-10 reveal-up">
              <p className="text-base md:text-xl font-light leading-relaxed serif opacity-80">
                At {salonName}, we believe that true aesthetic excellence is found in the intersection of architectural precision and organic soul. 
              </p>
              <div className="w-16 md:w-20 h-[1px] bg-accent" />
              <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 leading-loose">
                Established with a singular vision: to create a sanctuary where design meets wellness. Every ritual is a testament to our commitment to artisanal mastery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
