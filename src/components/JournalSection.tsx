"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "The Silent Dialogue: Understanding Skin Needs",
    date: "May 12, 2026",
    category: "Rituals",
    image: "/images/journal1.png",
    excerpt: "Exploring the neurological connection between sensorial touch and dermal health."
  },
  {
    title: "Architectural Hair: The Future of Styling",
    date: "April 28, 2026",
    category: "Design",
    image: "/images/hero.png",
    excerpt: "How geometric principles from modernism are shaping the next decade of hair design."
  }
];

export default function JournalSection() {
  return (
    <section id="journal" className="py-40 bg-background text-foreground border-t border-current/5">
      <div className="container-ed">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-32 gap-10">
          <div className="max-w-2xl">
            <span className="serif text-accent tracking-[0.8em] text-[10px] md:text-xs uppercase mb-8 block">The Journal</span>
            <h2 className="serif text-5xl md:text-8xl leading-[0.9]">Editorial <br /> <span className="italic">Perspectives</span></h2>
          </div>
          <button className="group flex items-center gap-4 text-[10px] uppercase tracking-widest hover:text-accent transition-colors">
            View All Stories 
            <div className="h-10 w-10 border border-current/20 rounded-full flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:text-background transition-all duration-500">
              <ArrowRight size={14} />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-32 lg:gap-48">
          {articles.map((article, idx) => (
            <div key={idx} className="group flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
              {/* Contained Journal Image */}
              <div className="w-full lg:w-1/2 aspect-[16/10] relative overflow-hidden shadow-sm">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              
              {/* Journal Content */}
              <div className="w-full lg:w-1/2">
                <div className="flex flex-col gap-8">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-medium">{article.category} — {article.date}</span>
                  <h3 className="serif text-4xl md:text-5xl group-hover:text-accent transition-colors duration-500 leading-tight max-w-xl">
                    {article.title}
                  </h3>
                  <p className="text-base md:text-lg opacity-50 max-w-md serif tracking-wide font-light leading-relaxed">
                    {article.excerpt}
                  </p>
                  <button className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-medium pt-4">
                    Read Story 
                    <div className="w-16 h-[1px] bg-current/20 group-hover:bg-accent group-hover:w-24 transition-all duration-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
