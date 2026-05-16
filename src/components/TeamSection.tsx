"use client";

import Image from "next/image";
import { useSalon } from "@/context/SalonContext";

const team = [
  {
    name: "Elena Rossi",
    role: "Lead Creative Stylist",
    image: "/images/team1.png",
    bio: "Specializing in geometric precision and organic texture integration. Elena's work has been featured in Global Vogue and Aesthetic Monthly."
  },
  {
    name: "Sarah Ellis",
    role: "Senior Aesthetician",
    image: "/images/team2.png",
    bio: "Expert in holistic skin restoration and sensorial therapy. Sarah brings a forensic approach to biological skin health."
  }
];

export default function TeamSection() {
  const { salonName } = useSalon();

  return (
    <section id="team" className="py-40 bg-background text-foreground">
      <div className="container-ed">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-32 gap-10">
          <div className="max-w-2xl">
            <span className="serif text-accent tracking-[0.8em] text-[10px] md:text-xs uppercase mb-8 block">The Artisans</span>
            <h2 className="serif text-5xl md:text-8xl leading-tight">Mastering the <br /> <span className="italic">Human</span> Canvas</h2>
          </div>
          <div className="max-w-xs text-[10px] uppercase tracking-[0.3em] opacity-40 leading-loose lg:pt-20">
            Our team of world-class artisans brings a forensic level of detail to every session, ensuring your biological signature is respected and enhanced.
          </div>
        </div>

        <div className="flex flex-col gap-32">
          {team.map((member, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32`}>
              {/* Contained Portrait */}
              <div className="w-full lg:w-2/5 aspect-[3/4] relative overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                />
              </div>

              {/* Artisan Details */}
              <div className="w-full lg:w-3/5">
                <span className="text-accent text-[8px] md:text-[10px] uppercase tracking-[0.6em] mb-6 block">{member.role}</span>
                <h3 className="serif text-4xl md:text-6xl mb-8 leading-none">{member.name}</h3>
                <p className="text-lg md:text-2xl max-w-xl serif tracking-wide font-light leading-relaxed opacity-70 mb-10">
                  {member.bio}
                </p>
                <div className="w-12 h-[1px] bg-accent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
