"use client";

import Image from "next/image";
import { useSalon } from "@/context/SalonContext";

export default function AboutSection() {
  const { salonName } = useSalon();

  return (
    <section id="about" className="relative py-40 bg-background text-foreground overflow-hidden">
      <div className="container-ed">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          {/* Contained Image - The 'Boutique' look */}
          <div className="w-full lg:w-1/2 aspect-[4/5] relative overflow-hidden shadow-2xl">
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
            <span className="serif text-accent tracking-[0.8em] text-[10px] md:text-xs uppercase mb-12 block">The Philosophy</span>
            
            <h2 className="serif text-5xl md:text-7xl mb-16 leading-tight">
              Transcending <br /> 
              <span className="italic">Traditional</span> <br /> 
              Beauty.
            </h2>
            
            <div className="max-w-xl space-y-10">
              <p className="text-lg md:text-xl font-light leading-relaxed serif opacity-80">
                At {salonName}, we believe that true aesthetic excellence is found in the intersection of architectural precision and organic soul. 
              </p>
              <div className="w-20 h-[1px] bg-accent" />
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
