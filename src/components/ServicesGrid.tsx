"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Facial Sculpting",
    desc: "Precision treatments to enhance natural contours using botanical alchemy.",
    image: "/images/treatment.png",
    category: "Ritual 01"
  },
  {
    title: "Essential Care",
    desc: "Meticulous products for daily restoration and skin-barrier reinforcement.",
    image: "/images/products.png",
    category: "Ritual 02"
  },
  {
    title: "Hair Design",
    desc: "Architectural approach to modern hair styling and textural balance.",
    image: "/images/hero.png",
    category: "Ritual 03"
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-40 bg-background text-foreground">
      <div className="container-ed">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <span className="serif text-accent tracking-[0.8em] text-[10px] md:text-xs uppercase mb-8 block">Our Expertise</span>
            <h2 className="serif text-5xl md:text-8xl leading-[0.9]">Curated <br /> <span className="italic">Specialties</span></h2>
          </div>
          <p className="max-w-xs text-[10px] uppercase tracking-[0.3em] opacity-40 leading-loose">
            A meticulous selection of services designed for the discerning individual who demands both precision and soul.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {services.map((service, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden mb-10 shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[40%] group-hover:grayscale-0"
                />
                <div className="absolute top-6 right-6 h-10 w-10 bg-background/20 backdrop-blur-md flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <span className="text-[8px] uppercase tracking-[0.4em] text-accent font-medium">{service.category}</span>
                <h3 className="serif text-2xl lg:text-3xl group-hover:text-accent transition-colors">{service.title}</h3>
                <p className="text-sm opacity-50 serif font-light leading-relaxed max-w-[280px]">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
