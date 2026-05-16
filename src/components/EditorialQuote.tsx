"use client";

import { motion } from "framer-motion";
import { useSalon } from "@/context/SalonContext";

export default function EditorialQuote() {
  const { salonName } = useSalon();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-background text-foreground overflow-hidden border-y border-current/5">
      <div className="container-ed">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="max-w-6xl mx-auto text-center"
        >
          <span className="serif text-accent tracking-[1em] text-[8px] md:text-[10px] uppercase mb-16 block">The Statement</span>
          
          <h2 className="serif text-4xl md:text-7xl lg:text-8xl leading-tight italic">
            "Design is the <span className="not-italic">silent</span> language of <br /> 
            <span className="text-accent">aesthetic</span> sovereignty."
          </h2>
          
          <div className="mt-20 flex flex-col items-center gap-6">
            <div className="w-[1px] h-20 bg-current/10" />
            <span className="serif text-[8px] md:text-[10px] uppercase tracking-[0.5em] opacity-40">— {salonName} Studio</span>
          </div>
        </motion.div>
      </div>

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
        <span className="serif text-[30vw] uppercase tracking-tighter whitespace-nowrap">
          {salonName}
        </span>
      </div>
    </section>
  );
}
